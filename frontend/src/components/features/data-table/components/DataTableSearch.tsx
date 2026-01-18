import { Input } from "@/src/components/ui/input";
import { Table } from "@tanstack/react-table";
import { ChangeEvent } from "react";

interface DataTableSearch<T> {
  placeholder?: string;
  table: Table<T>;
}

export function DataTableSearch<T>(props: DataTableSearch<T>) {
  const { placeholder, table } = props;
  const globalFilter = table.getState().globalFilter ?? "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(event.target.value);
  };

  return (
    <Input
      placeholder={placeholder}
      value={globalFilter}
      onChange={handleChange}
      className="max-w-sm"
    />
  );
}
