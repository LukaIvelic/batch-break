import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Updater,
} from "@tanstack/react-table";

interface UseReactTableProps<TData> {
  data: TData[];
  columns: any; //eslint-disable-line

  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: {}; //eslint-disable-line

  pageCount?: number;
  rowCount?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };

  setSorting: (updater: Updater<SortingState>) => void;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;
  setRowSelection: (updater: {}) => void; //eslint-disable-line
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
}: UseReactTableProps<TData>) {
  return useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    rowCount,
    manualPagination: !!pageCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

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

    initialState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  });
}
