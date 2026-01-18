import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Column, Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

interface DataTableColumnVisibilityItemProps<T> {
  column: Column<T, unknown>;
}

function DataTableColumnVisibilityItem<T>(
  props: DataTableColumnVisibilityItemProps<T>,
) {
  const { column } = props;

  return (
    <DropdownMenuCheckboxItem
      key={column.id}
      className="capitalize"
      checked={column.getIsVisible()}
      onCheckedChange={(value) => column.toggleVisibility(!!value)}
    >
      {column.id}
    </DropdownMenuCheckboxItem>
  );
}

interface DataTableColumnVisibilityProps<T> {
  table: Table<T>;
}

export function DataTableColumnVisibility<T>(
  props: DataTableColumnVisibilityProps<T>,
) {
  const { table } = props;

  const columns = table.getAllColumns();
  const canHideColumn = (column: Column<any>) => column.getCanHide(); //eslint-disable-line

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.filter(canHideColumn).map((column, index) => (
          <DataTableColumnVisibilityItem column={column} key={index} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
