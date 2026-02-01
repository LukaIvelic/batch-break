import { Checkbox } from "@/src/components/ui/checkbox";
import { Issue, IssueSeverity, IssueStatus, User } from "@/src/types";
import { ColumnDef } from "@tanstack/react-table";
import { TruncatedText } from "../../../truncated-text/TruncatedText";
import { DataTableActionCell } from "../../../data-table/components/DataTableActionCell";
import { capizalize } from "@/src/lib/utils";
import { getShipmentIssueActionCellConfig } from "./ActionCell.config";

export const getSeverityLabel = (severity: IssueSeverity): string => {
  switch (severity) {
    case IssueSeverity.LOW:
      return "Low";
    case IssueSeverity.MEDIUM:
      return "Medium";
    case IssueSeverity.HIGH:
      return "High";
    default:
      return "Unknown";
  }
};

export const toSeverity = (label: string): IssueSeverity | null => {
  switch (label.toLowerCase()) {
    case "low":
      return IssueSeverity.LOW;
    case "medium":
      return IssueSeverity.MEDIUM;
    case "high":
      return IssueSeverity.HIGH;
    default:
      return null;
  }
};

export const getColumns = (user: User | null): ColumnDef<Issue>[] => [
  {
    id: "select",
    size: 25,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    size: 90,
    header: "Issue ID",
    cell: ({ row }) => (
      <TruncatedText maxLength={15}>{row.getValue("id")}</TruncatedText>
    ),
  },
  {
    accessorKey: "issueReporter",
    size: 120,
    header: "Issue Reporter",
    cell: ({ row }) => {
      const reporter = row.original.issueReporter;
      return (
        <div>
          {reporter?.firstName} {reporter?.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "issueSeverity",
    size: 90,
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("issueSeverity") as IssueSeverity;
      return <div>{getSeverityLabel(severity)}</div>;
    },
  },
  {
    accessorKey: "referencesShipment",
    size: 120,
    header: "Shipment",
    cell: ({ row }) => {
      const shipment = row.original.referencesShipment;
      return (
        <TruncatedText maxLength={15}>
          {shipment?.shipmentNumber ?? "N/A"}
        </TruncatedText>
      );
    },
  },
  {
    accessorKey: "issueStatus",
    size: 90,
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("issueStatus") as IssueStatus;
      return <div>{capizalize(String(status))}</div>;
    },
  },
  {
    accessorKey: "description",
    size: 90,
    header: "Description",
    cell: ({ row }) => {
      return (
        <TruncatedText maxLength={15}>
          {row.getValue("description") ?? "N/A"}
        </TruncatedText>
      );
    },
  },
  {
    id: "actions",
    size: 90,
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DataTableActionCell<Issue>
          entity={row.original}
          service={null}
          user={user}
          actions={getShipmentIssueActionCellConfig({
            shipmentIssue: row.original,
          })}
        />
      );
    },
  },
];
