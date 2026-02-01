import { useCallback, useState } from "react";
import { toast } from "sonner";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";

import { shipmentService } from "@/src/api/services";
import {
  ArticleSchema,
  CodeType,
  CreateShipmentDto,
  ShipmentItemSchema,
  ShipmentStatus,
} from "@/src/types";

import {
  extractFormat,
  extractRawValue,
  isValidFormat,
  parseBarcode,
  parseJsonFromScan,
} from "./CodeScanner.utils";
import type {
  ArticleScanResult,
  ParseResult,
  ShipmentScanResult,
} from "./useCodeParser.types";

function validateArticle(barcode: string): ParseResult<ArticleScanResult> {
  const result = ArticleSchema.safeParse({ barcode });

  if (!result.success) {
    return {
      success: false,
      error: { message: "Invalid barcode format", code: "VALIDATION_FAILED" },
    };
  }

  return { success: true, data: { barcode: result.data.barcode } };
}

function validateShipmentItems(data: unknown): ParseResult<ShipmentScanResult> {
  if (!data || typeof data !== "object" || !("items" in data)) {
    return {
      success: false,
      error: {
        message: "Invalid QR data structure",
        code: "VALIDATION_FAILED",
      },
    };
  }

  const result = ShipmentItemSchema.array().safeParse(
    (data as { items: unknown }).items,
  );

  if (!result.success) {
    return {
      success: false,
      error: { message: "Invalid shipment items", code: "VALIDATION_FAILED" },
    };
  }

  return { success: true, data: { items: result.data } };
}

function parseArticleScan(rawValue: string): ParseResult<ArticleScanResult> {
  const barcode = parseBarcode(rawValue);
  return validateArticle(barcode);
}

function parseShipmentScan(rawValue: string): ParseResult<ShipmentScanResult> {
  try {
    const parsed = parseJsonFromScan(rawValue);
    return validateShipmentItems(parsed);
  } catch {
    return {
      success: false,
      error: { message: "Failed to parse QR code data", code: "PARSE_ERROR" },
    };
  }
}

async function handleShipmentImport(
  items: ShipmentScanResult["items"],
): Promise<boolean> {
  const dto: CreateShipmentDto = {
    status: ShipmentStatus.DRAFT,
    items,
  };

  try {
    await shipmentService.create(dto);
    return true;
  } catch {
    return false;
  }
}

async function handleArticleScan(barcode: string): Promise<boolean> {
  try {
    const result = await shipmentService.scanArticle(barcode);
    console.log(result);
    if (!result) showErrorToast("Article not found in any shipment");
    return result !== null;
  } catch {
    return false;
  }
}

function showSuccessToast(message: string): void {
  toast.success(message, {
    position: "top-center",
    action: { label: "OK", onClick: () => toast.dismiss() },
  });
}

function showErrorToast(message: string): void {
  toast.error(message, {
    position: "top-center",
    action: { label: "OK", onClick: () => toast.dismiss() },
  });
}

type UseCodeParserOptions = {
  expectedFormat: CodeType;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export function useCodeParser(options: UseCodeParserOptions) {
  const { expectedFormat, onSuccess, onError } = options;
  const [paused, setPaused] = useState(false);

  const processArticleScan = useCallback(
    async (rawValue: string) => {
      const result = parseArticleScan(rawValue);

      if (!result.success) {
        showErrorToast(result.error.message);
        onError?.(result.error.message);
        return;
      }

      const success = await handleArticleScan(result.data.barcode);

      if (success) {
        showSuccessToast("Article scanned successfully!");
        onSuccess?.();
      } else {
        showErrorToast("Failed to process article");
        onError?.("Failed to process article");
      }
    },
    [onSuccess, onError],
  );

  const processShipmentScan = useCallback(
    async (rawValue: string) => {
      const result = parseShipmentScan(rawValue);

      if (!result.success) {
        showErrorToast(result.error.message);
        onError?.(result.error.message);
        return;
      }

      const success = await handleShipmentImport(result.data.items);

      if (success) {
        showSuccessToast("Shipment imported successfully!");
        onSuccess?.();
      } else {
        showErrorToast("Failed to import shipment. Please try again.");
        onError?.("Failed to import shipment");
      }
    },
    [onSuccess, onError],
  );

  const onScan = useCallback(
    async (results: IDetectedBarcode[]) => {
      if (paused || results.length === 0) return;

      setPaused(true);

      try {
        const format = extractFormat(results);

        if (!isValidFormat(format)) {
          showErrorToast("Unsupported code format");
          onError?.("Unsupported code format");
          return;
        }

        if (format !== expectedFormat) {
          const expected =
            expectedFormat === CodeType.QR ? "QR code" : "barcode";
          showErrorToast(`Please scan a ${expected}`);
          onError?.(`Format mismatch: expected ${expectedFormat}`);
          return;
        }

        const rawValue = extractRawValue(results);

        if (expectedFormat === CodeType.EAN13) {
          await processArticleScan(rawValue);
        } else if (expectedFormat === CodeType.QR) {
          await processShipmentScan(rawValue);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Scan failed";
        showErrorToast(message);
        onError?.(message);
      } finally {
        setPaused(false);
      }
    },
    [paused, expectedFormat, processArticleScan, processShipmentScan, onError],
  );

  return {
    paused,
    setPaused,
    onScan,
  };
}
