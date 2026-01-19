import { TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

interface DataTableHeader<T> {
  table: Table<T>;
}

export function DataTableHeader<T>(props: DataTableHeader<T>) {
  const { table } = props;
  const headerGroups = table.getHeaderGroups();

  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => {
        const headers = headerGroup.headers;

        return (
          <TableRow key={headerGroup.id}>
            {headers.map((header) => {
              const isPlaceholder = header.isPlaceholder;
              const columnHeader = header.column.columnDef.header;
              const headerContext = header.getContext();

              return (
                <TableHead
                  key={header.id}
                  style={{ width: header.column.getSize() }}
                >
                  {!isPlaceholder && flexRender(columnHeader, headerContext)}
                </TableHead>
              );
            })}
          </TableRow>
        );
      })}
    </TableHeader>
  );
}
