import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  type OnChangeFn,
} from "@tanstack/react-table";

interface UseReactTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];

  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: Record<string, boolean>;

  pageCount?: number;
  rowCount?: number;
  pagination?: PaginationState;

  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setRowSelection: OnChangeFn<Record<string, boolean>>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  manualPagination?: boolean;
}

export function useInitializeReactTable<TData>({
  data,
  columns,
  sorting,
  columnFilters,
  columnVisibility,
  rowSelection,
  pageCount,
  rowCount,
  pagination,
  setSorting,
  setColumnFilters,
  setColumnVisibility,
  setRowSelection,
  onPaginationChange,
  manualPagination,
}: UseReactTableProps<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  return useReactTable({
    data,
    columns,
    pageCount,
    rowCount,
    manualPagination: manualPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: onPaginationChange,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
}
