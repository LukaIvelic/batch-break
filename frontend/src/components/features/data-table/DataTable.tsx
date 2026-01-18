"use client";

import * as React from "react";
import { Table } from "@/src/components/ui/table";
import { DataTableSearch } from "./components/DataTableSearch";
import { DataTableColumnVisibility } from "./components/DataTableColumnVisibility";
import { DataTableHeader } from "./components/DataTableHeader";
import { DataTableBody } from "./components/DataTableBody";
import { DataTablePagination } from "./components/DataTablePagination/DataTablePagination";
import { useInitializeReactTable } from "./useInitializeReactTable.hook";
import { useSearchParams } from "next/navigation";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

interface DataTableProps {
  data: unknown[];
  columns: ColumnDef<any, any>[]; //eslint-disable-line
  pageCount?: number;
  rowCount?: number;
  isLoading?: boolean;
}

export function DataTable(props: DataTableProps) {
  const { data, columns, pageCount, rowCount, isLoading } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const pageIndex = page - 1;

  const table = useInitializeReactTable({
    data,
    columns,
    pageCount,
    rowCount,
    pagination: { pageIndex, pageSize: limit },
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DataTableSearch placeholder="Search..." table={table} />
        <DataTableColumnVisibility table={table} />
      </div>
      <div className="overflow-y-auto rounded-md border h-[60vh]">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            columns={columns}
            isLoading={isLoading}
          />
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
