import { Checkbox } from "@/src/components/ui/checkbox";
import { Shipment, User } from "@/src/types";
import { ColumnDef } from "@tanstack/react-table";
import { TruncatedText } from "../../../truncated-text/TruncatedText";
import { ShipmentsActionCell } from "./ShipmentsActionCell";

export const getColumns = (user: User | null): ColumnDef<Shipment>[] => [
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
    accessorKey: "shipmentNumber",
    size: 90,
    header: "Shipment ID",
    cell: ({ row }) => (
      <TruncatedText maxLength={15}>
        {row.getValue("shipmentNumber")}
      </TruncatedText>
    ),
  },
  {
    accessorKey: "differentArticles",
    size: 90,
    header: "Different articles",
    cell: ({ row }) => <div>{row.getValue("differentArticles")}</div>,
  },
  {
    accessorKey: "totalArticles",
    size: 90,
    header: "Total articles",
    cell: ({ row }) => <div>{row.getValue("totalArticles")}</div>,
  },
  {
    accessorKey: "scannedArticles",
    size: 90,
    header: "Scanned articles",
    cell: ({ row }) => <div>{row.getValue("scannedArticles")}</div>,
  },
  {
    accessorKey: "progress",
    size: 90,
    header: "Progress",
    cell: ({ row }) => <div>{row.getValue("progress")}</div>,
  },
  {
    accessorKey: "status",
    size: 90,
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "actions",
    size: 90,
    header: "Actions",
    cell: ({ row }) => {
      return <ShipmentsActionCell shipments={row.original} user={user} />;
    },
  },
];
