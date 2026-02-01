import { Subtitle, Title } from "@/src/components/features";
import { CodeScanner } from "@/src/components/features/scanner/CodeScanner";
import { CodeType } from "@/src/types/CodeType";

export default function QRScanPage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Scan QR Code</Title>
        <Subtitle>Scan QR codes to import shipments</Subtitle>
      </div>
      <CodeScanner lookFor={CodeType.QR} />
    </div>
  );
}
