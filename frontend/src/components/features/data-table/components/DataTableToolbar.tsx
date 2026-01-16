import { Table } from "@tanstack/react-table";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Search, X } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterKey?: string;
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  useGlobalFilter?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  filterKey,
  globalFilter,
  setGlobalFilter,
  useGlobalFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {useGlobalFilter && setGlobalFilter ? (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="h-8 w-[200px] lg:w-[300px] pl-8"
            />
            {globalFilter && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-8 px-2 hover:bg-transparent"
                onClick={() => setGlobalFilter("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : filterKey ? (
          <Input
            placeholder={`Filter ${filterKey}...`}
            value={
              (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : null}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export function DataTableClientPagination<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
