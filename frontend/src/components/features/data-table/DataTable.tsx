"use client";

import { Table } from "@/src/components/ui/table";
import { DataTableSearch } from "./components/DataTableSearch";
import { DataTableColumnVisibility } from "./components/DataTableColumnVisibility";
import { DataTableHeader } from "./components/DataTableHeader";
import { DataTableBody } from "./components/DataTableBody";
import { DataTablePagination } from "./components/DataTablePagination/DataTablePagination";
import { useInitializeReactTable } from "./useInitializeReactTable.hook";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  type OnChangeFn,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  rowCount?: number;
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
  isLoading?: boolean;
  tableId?: string;
  includeSearch?: boolean;
}

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    data,
    columns,
    pageCount,
    rowCount,
    isLoading,
    pagination,
    includeSearch = false,
    setPagination,
  } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useInitializeReactTable({
    data,
    columns,
    pageCount,
    rowCount,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    pagination,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  return (
    <div className="w-full flex flex-col h-[60vh]">
      <div className="flex items-center py-4">
        {includeSearch && (
          <DataTableSearch placeholder="Search..." table={table} />
        )}
        <DataTableColumnVisibility table={table} />
      </div>
      <div className="overflow-y-auto rounded-md border flex-1">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            columns={columns}
            isLoading={isLoading}
          />
        </Table>
      </div>
      <DataTablePagination table={table} isLoading={isLoading} />
    </div>
  );
}
