"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { CodeType } from "@/src/types";
import { useCodeParser } from "./useCodeParser";

interface CodeScannerProps {
  lookFor: CodeType;
}

export function CodeScanner({ lookFor }: CodeScannerProps) {
  const { paused, onScan } = useCodeParser({ expectedFormat: lookFor });

  return (
    <div className="aspect-square w-[50vh] max-w-100  my-16 rounded-xl overflow-hidden border border-foreground/10">
      <Scanner
        onScan={onScan}
        onError={(error) => console.log(error)}
        sound={false}
        paused={paused}
      />
    </div>
  );
}
