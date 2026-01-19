import { Spinner } from "@/src/components/ui/spinner";
import { TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface DataTableBody<T> {
  table: Table<T>;
  columns: ColumnDef<T>[];
  isLoading?: boolean;
}

export function DataTableBody<T>(props: DataTableBody<T>) {
  const { table, columns, isLoading } = props;
  const hasRows = table.getRowModel().rows?.length;

  if (isLoading) {
    return (
      <TableBody className="h-[40vh]">
        <TableRow>
          <TableCell colSpan={columns.length} className="h-full relative">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Spinner /> Loading...
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!hasRows) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
