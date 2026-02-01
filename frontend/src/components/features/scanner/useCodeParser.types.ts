import { CreateShipmentItemDto } from "@/src/types";

export type ArticleScanResult = {
  barcode: string;
};

export type ShipmentScanResult = {
  items: CreateShipmentItemDto[];
};

export type ScanResult = ArticleScanResult | ShipmentScanResult;

export type ScanError = {
  message: string;
  code:
    | "INVALID_FORMAT"
    | "VALIDATION_FAILED"
    | "PARSE_ERROR"
    | "FORMAT_MISMATCH";
};

export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: ScanError };
