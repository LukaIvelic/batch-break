"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DataTableToolbar,
  DataTableClientPagination,
} from "./DataTableToolbar";
import { DataTableServerPagination } from "./DataTableServerPagination";
import { Spinner } from "@/src/components/ui/spinner";

interface ServerPaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string;
  searchableColumns?: string[];
  onSearch?: (search: string) => void;
  searchValue?: string;
  serverPagination?: ServerPaginationProps;
  isLoading?: boolean;
  initialColumnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  searchableColumns,
  onSearch,
  searchValue,
  serverPagination,
  isLoading,
  initialColumnVisibility = {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialColumnVisibility);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Use server search if onSearch is provided, otherwise use client-side filtering
  const isServerSearch = !!onSearch;

  const globalFilterFn: FilterFn<TData> = React.useCallback(
    (row, columnId, filterValue) => {
      if (
        isServerSearch ||
        !searchableColumns ||
        searchableColumns.length === 0
      ) {
        return true;
      }
      const search = filterValue.toLowerCase();
      return searchableColumns.some((col) => {
        const value = row.getValue(col);
        return value != null && String(value).toLowerCase().includes(search);
      });
    },
    [searchableColumns, isServerSearch],
  );

  const handleSearchChange = (value: string) => {
    if (onSearch) {
      onSearch(value);
    } else {
      setGlobalFilter(value);
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: serverPagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    manualPagination: !!serverPagination,
    pageCount: serverPagination?.totalPages ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: isServerSearch ? "" : globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        filterKey={filterColumn}
        globalFilter={isServerSearch ? (searchValue ?? "") : globalFilter}
        setGlobalFilter={handleSearchChange}
        useGlobalFilter={
          isServerSearch ||
          (!!searchableColumns && searchableColumns.length > 0)
        }
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex justify-center items-center gap-2">
                    <Spinner /> Loading
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {serverPagination ? (
        <DataTableServerPagination
          total={serverPagination.total}
          page={serverPagination.page}
          limit={serverPagination.limit}
          totalPages={serverPagination.totalPages}
          hasNextPage={serverPagination.hasNextPage}
          hasPreviousPage={serverPagination.hasPreviousPage}
          onPageChange={serverPagination.onPageChange}
          onPageSizeChange={serverPagination.onPageSizeChange}
        />
      ) : (
        <DataTableClientPagination table={table} />
      )}
    </div>
  );
}
