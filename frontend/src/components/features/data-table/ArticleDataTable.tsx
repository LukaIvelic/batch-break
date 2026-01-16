"use client";

import { DataTable } from "./components/DataTable";
import { articleColumns } from "./columns/ArticleColumns";
import { useState, useRef, useEffect, useMemo } from "react";
import { useArticles } from "@/src/hooks/useArticles";

export function ArticleDataTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idPadStartDigits = 7;

  const params = useMemo(
    () => ({
      page,
      limit,
      search: debouncedSearch || undefined,
    }),
    [page, limit, debouncedSearch],
  );

  const { data, isLoading } = useArticles(params);

  const articles = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((article) => ({
      ...article,
      id: article.id.toString().padStart(idPadStartDigits, "0"),
      lastModified: article.lastModified
        ? new Date(article.lastModified).toLocaleDateString("en-GB")
        : "-",
      createdAt: new Date(article.createdAt).toLocaleDateString("en-GB"),
    }));
  }, [data]);

  const pagination = data?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DataTable
      columns={articleColumns}
      data={articles}
      onSearch={handleSearch}
      searchValue={searchTerm}
      initialColumnVisibility={{
        createdAt: false,
        lastModified: false,
      }}
      serverPagination={{
        ...pagination,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
      isLoading={isLoading}
    />
  );
}
