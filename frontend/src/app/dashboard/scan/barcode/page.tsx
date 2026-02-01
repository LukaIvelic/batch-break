import { Subtitle, Title } from "@/src/components/features";
import { CodeScanner } from "@/src/components/features/scanner/CodeScanner";
import { CodeType } from "@/src/types";

export default function ArticlePage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Scan Barcode</Title>
        <Subtitle>Scan barcodes to process articles</Subtitle>
      </div>
      <CodeScanner lookFor={CodeType.EAN13} />
    </div>
  );
}
