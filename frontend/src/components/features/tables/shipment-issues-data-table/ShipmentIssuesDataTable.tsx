"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/src/api/services";
import { DataTable } from "../../data-table/DataTable";
import { usePaginationStore } from "@/src/hooks/usePaginationStore";
import { getColumns } from "./components/ShipmentIssuesDataTableColumns";
import { issuesService } from "@/src/api/services/issues/IssueService";

export function ShipmentIssuesDataTable() {
  const tableId = "shipment-issues";
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
    queryFn: () => issuesService.getAll(),
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
