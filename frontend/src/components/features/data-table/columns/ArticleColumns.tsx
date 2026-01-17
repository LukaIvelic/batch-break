"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/src/components/ui/checkbox";
import { DataTableRowActions } from "../components/DataTableRowActions";
import { Article } from "@/src/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

const truncate = (str: string | undefined | null, maxLength: number) => {
  if (!str) return "";
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
};

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
    size: 40,
    minSize: 40,
    maxSize: 40,
  },
  {
    accessorKey: "id",
    header: "ID",
    size: 90,
    minSize: 90,
    maxSize: 90,
  },
  {
    accessorKey: "article_id",
    header: "Article ID",
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
    size: 130,
    minSize: 130,
    maxSize: 130,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 180,
    minSize: 180,
    maxSize: 180,
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{truncate(row.getValue("name"), 15)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{row.getValue("name")}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
    size: 130,
    minSize: 130,
    maxSize: 130,
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{truncate(row.getValue("manufacturer"), 15)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{row.getValue("manufacturer")}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 80,
    minSize: 80,
    maxSize: 80,
    cell: ({ row }) => `$${parseFloat(row.getValue("price")).toFixed(2)}`,
  },
  {
    accessorKey: "scanned",
    header: "Scanned",
    size: 80,
    minSize: 80,
    maxSize: 80,
    cell: ({ row }) => row.getValue("scanned"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 100,
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    size: 120,
    minSize: 120,
    maxSize: 120,
  },
  {
    id: "actions",
    size: 50,
    minSize: 50,
    maxSize: 50,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
