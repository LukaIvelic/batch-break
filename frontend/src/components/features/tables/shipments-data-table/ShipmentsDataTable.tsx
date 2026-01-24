"use client";

import { useQuery } from "@tanstack/react-query";
import { shipmentService, useAuth } from "@/src/api/services";
import { DataTable } from "../../data-table/DataTable";
import { usePaginationStore } from "@/src/hooks/usePaginationStore";
import { getColumns } from "./components/ShipmentsDataTableColumns";
export function ShipmentsDataTable() {
  const tableId = "shipments";
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
    queryFn: () =>
      shipmentService.getAll({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
  });

  return (
    <DataTable
      data={data?.data || []}
      columns={getColumns(user)}
      rowCount={data?.meta?.total ?? 0}
      pageCount={data?.meta?.totalPages ?? 0}
      isLoading={isLoading}
      tableId={tableId}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
