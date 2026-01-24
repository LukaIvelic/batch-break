"use client";

import { useAuth, usersService } from "@/src/api/services";
import { usePaginationStore } from "@/src/hooks/usePaginationStore";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../data-table/DataTable";
import { getColumns } from "./ManageEmployeesDataTableColumns";

export function ManageEmployeesDataTable() {
  const tableId = "manage-employees";
  const { user } = useAuth();

  const pagination = usePaginationStore((s) => s.tables[tableId]) ?? {
    pageIndex: 0,
    pageSize: 30,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setPagination = (updater: any) =>
    usePaginationStore.getState().setPagination(tableId, updater);

  const { data, isLoading } = useQuery({
    queryKey: [tableId, pagination.pageIndex, pagination.pageSize],
    queryFn: () => usersService.getAll(),
  });

  return (
    <DataTable
      data={data || []}
      columns={getColumns(user)}
      isLoading={isLoading}
      tableId={tableId}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
