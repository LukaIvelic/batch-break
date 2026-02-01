"use client";

import { CreateIssuePayload } from "@/src/types";
import { Button } from "../../ui/button";
import { Input } from "../input/Input";
import { TextArea } from "../input/TextArea";
import { useAuth } from "@/src/api/services/auth/useSession";
import { Dropdown } from "../input/Dropdown";
import { useRef, useState } from "react";
import { toSeverity } from "../tables/shipment-issues-data-table/components/ShipmentIssuesDataTableColumns";
import { issuesService } from "@/src/api/services/issues/IssueService";
import { toast } from "sonner";
import { usePopup } from "../../ui/popup";
import { useQueryClient } from "@tanstack/react-query";

const severityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function ReportIssue() {
  const tableId = "shipment-issues";
  const { user } = useAuth();
  const { close } = usePopup();
  const queryClient = useQueryClient();
  const [severity, setSeverity] = useState<string>("");
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const shipmentIdRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = () => {
    const payload: Partial<CreateIssuePayload> = {
      issueReporter: user?.id,
      referencesShipment: shipmentIdRef.current?.value
        ? parseInt(shipmentIdRef.current.value)
        : undefined,
      issueSeverity: toSeverity(severity) || undefined,
      description: descriptionRef.current?.value ?? "",
    };

    issuesService.create(payload).then(() => {
      toast.success("Issue reported successfully");
      queryClient.invalidateQueries({ queryKey: [tableId] });
      close();
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Shipment ID"
        className="rounded-xl"
        ref={shipmentIdRef}
      />
      <Dropdown
        options={severityOptions}
        placeholder="Select Severity"
        value={severity}
        onChange={setSeverity}
        triggerClassName="h-12! rounded-xl"
      />
      <TextArea
        placeholder="Description"
        className="rounded-xl h-40"
        ref={descriptionRef}
      />
      <Button className="w-full mt-2 hover:cursor-pointer" onClick={onSubmit}>
        Report Issue
      </Button>
    </div>
  );
}
