"use client";

import { Subtitle, Title } from "@/src/components/features";
import { ReportIssue } from "@/src/components/features/report-issue/ReportIssue";
import { ShipmentIssuesDataTable } from "@/src/components/features/tables/shipment-issues-data-table/ShipmentIssuesDataTable";
import { Button } from "@/src/components/ui/button";
import { usePopup } from "@/src/components/ui/popup";
import { ClipboardPlus } from "lucide-react";

export default function ShipmentIssuesPage() {
  const { open } = usePopup();

  const handleReportIssue = () => {
    open({
      title: "Report a Shipment Issue",
      subtitle: "Fill out the form below to report a new shipment issue.",
      content: <ReportIssue />,
    });
  };

  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Shipment Issues</Title>
        <Subtitle>Manage and resolve shipment issues</Subtitle>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Button variant="outline" className="w-fit" onClick={handleReportIssue}>
          <ClipboardPlus />
          Report Issue
        </Button>
        <ShipmentIssuesDataTable />
      </div>
    </div>
  );
}
