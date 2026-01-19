"use client";

import { DataTable } from "../../data-table/DataTable";
import { columns } from "./ArticleDataTableColumns";
import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/src/types";
import { articleService } from "@/src/api/services/articles/ArticleService";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function ArticleDataTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["articles", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      articleService.getAll({
        limit: pagination.pageSize,
        page: pagination.pageIndex,
      }),
  });

  const [lastMeta, setLastMeta] = useState({ total: 0, totalPages: 0 });

  useEffect(() => {
    if (data?.meta) {
      //eslint-disable-next-line
      setLastMeta(data.meta);
    }
  }, [data?.meta]);

  const articles = data?.data || [];
  const rowCount = data?.meta?.total ?? lastMeta.total;
  const pageCount = data?.meta?.totalPages ?? lastMeta.totalPages;

  return (
    <DataTable
      data={articles}
      columns={columns as ColumnDef<Article, unknown>[]}
      rowCount={rowCount}
      pageCount={pageCount}
      isLoading={isLoading}
      tableId="articles"
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
