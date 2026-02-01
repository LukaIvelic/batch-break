import { Issue, IssueStatus } from "@/src/types";
import { Action } from "../../../data-table/components/DataTableActionCell";
import { issuesService } from "@/src/api/services/issues/IssueService";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { usePopup } from "@/src/components/ui/popup";
import { getSeverityLabel } from "./ShipmentIssuesDataTableColumns";

interface ShipmentIssueActionCellConfigProps {
  shipmentIssue: Issue;
}

export function getShipmentIssueActionCellConfig({
  shipmentIssue,
}: ShipmentIssueActionCellConfigProps): Action[] {
  const tableId = "shipment-issues";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { open } = usePopup();

  const shipmentIssueActionCellConfig: Action[] = [
    {
      title: "View Details",
      onClick: () => {
        open({
          title: `${shipmentIssue.referencesShipment.shipmentNumber} Issue Details`,
          subtitle: `${new Date(shipmentIssue.createdAt).toLocaleDateString("en-GB")}, ${getSeverityLabel(shipmentIssue.issueSeverity)} severity`,
          content: <div>{shipmentIssue.description}</div>,
        });
      },
    },
    {
      title:
        shipmentIssue.issueStatus === IssueStatus.RESOLVED
          ? "Reopen Issue"
          : "Resolve Issue",
      onClick: () => {
        const payload: Partial<Issue> = {
          issueStatus:
            shipmentIssue.issueStatus === IssueStatus.RESOLVED
              ? IssueStatus.UNRESOLVED
              : IssueStatus.RESOLVED,
        };

        issuesService.update(shipmentIssue.id.toString(), payload).then(() => {
          toast.success(
            `Issue ${shipmentIssue.issueStatus === IssueStatus.RESOLVED ? "reopened" : "resolved"} successfully`,
          );
          queryClient.invalidateQueries({ queryKey: [tableId] });
        });
      },
    },
    {
      title: "Dismiss Issue",
      onClick: () => {},
    },
    {
      title: "Delete",
      onClick: () => {},
      type: "destructive",
    },
  ];

  return shipmentIssueActionCellConfig;
}
