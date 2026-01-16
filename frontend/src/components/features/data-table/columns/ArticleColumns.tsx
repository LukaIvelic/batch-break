"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/src/components/ui/checkbox";
import { DataTableRowActions } from "../components/DataTableRowActions";
import { Article } from "@/src/types";

export const articleColumns: ColumnDef<Article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "article_id", header: "Article ID" },
  { accessorKey: "barcode", header: "Barcode" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "manufacturer", header: "Manufacturer" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${parseFloat(row.getValue("price")).toFixed(2)}`,
  },
  {
    accessorKey: "scanned",
    header: "Scanned",
    cell: ({ row }) => row.getValue("scanned"),
  },
  { accessorKey: "createdAt", header: "Created At" },
  { accessorKey: "lastModified", header: "Last Modified" },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
