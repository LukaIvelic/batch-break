import { CodeType } from "@/src/types";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";

export function isValidFormat(format: string): format is CodeType {
  return Object.values(CodeType).includes(format as CodeType);
}

export function extractRawValue(results: IDetectedBarcode[]): string {
  const firstResult = results[0];
  if (!firstResult?.rawValue) {
    throw new Error("No scan data found");
  }
  return firstResult.rawValue;
}

export function extractFormat(results: IDetectedBarcode[]): string {
  const firstResult = results[0];
  if (!firstResult?.format) {
    throw new Error("No format detected");
  }
  return firstResult.format;
}

export function parseJsonFromScan(rawValue: string): unknown {
  const sanitized = rawValue.replaceAll("'", '"');
  return JSON.parse(sanitized);
}

export function parseBarcode(rawValue: string): string {
  return rawValue.trim();
}
