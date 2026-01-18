import { useSearchParams } from "next/navigation";
import { DataTable } from "../../data-table/DataTable";
import { columns } from "./ArticleDataTableColumns";
import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/src/types";
import { articleService } from "@/src/api/services/articles/ArticleService";
import { useQuery } from "@tanstack/react-query";

export function ArticleDataTable() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", page, limit],
    queryFn: () => articleService.getAll({ limit: limit, page: page }),
  });

  const articles = data?.data || [];
  const pageCount = data?.meta.totalPages || 0;
  const rowCount = data?.meta.total || 0;

  return (
    <DataTable
      data={articles}
      columns={columns as ColumnDef<Article, unknown>[]}
      pageCount={pageCount}
      rowCount={rowCount}
      isLoading={isLoading}
    />
  );
}
