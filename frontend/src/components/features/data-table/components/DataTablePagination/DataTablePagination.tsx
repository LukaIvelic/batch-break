"use client";

import { Button } from "@/src/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePaginationUtils } from "./DataTablePagination.utils";

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getRowCount();
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, rowCount);

  const { actions, disabled } = usePaginationUtils(table);

  const buttons: {
    key: string;
    icon: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
  }[] = [
    {
      key: "first",
      icon: <ChevronsLeft />,
      onClick: actions.first,
      disabled: disabled.first,
    },
    {
      key: "prev",
      icon: <ChevronLeft />,
      onClick: actions.prev,
      disabled: disabled.prev,
    },
    {
      key: "next",
      icon: <ChevronRight />,
      onClick: actions.next,
      disabled: disabled.next,
    },
    {
      key: "last",
      icon: <ChevronsRight />,
      onClick: actions.last,
      disabled: disabled.last,
    },
  ];

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {!start || !end || !rowCount ? "" : `${start} to ${end} of ${rowCount}`}
      </div>
      <div className="space-x-2">
        {buttons.map(({ key, icon, onClick, disabled }) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={onClick}
            disabled={disabled}
          >
            {icon}
          </Button>
        ))}
      </div>
    </div>
  );
}
