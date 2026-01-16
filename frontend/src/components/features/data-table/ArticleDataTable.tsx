"use client";

import { DataTable } from "./components/DataTable";
import { articleColumns } from "./columns/ArticleColumns";
import { Article, PaginationMeta } from "@/src/types";
import { useEffect, useState, useCallback, useRef } from "react";
import { articleService } from "@/src/api/services/articles/ArticleService";

export function ArticleDataTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idPadStartDigits = 7;

  const fetchArticles = useCallback(
    async (page: number, limit: number, search?: string) => {
      setIsLoading(true);
      try {
        const response = await articleService.getAll({
          page,
          limit,
          search: search || undefined,
        });
        const formattedArticles = response.data.map((article) => ({
          ...article,
          id: article.id.toString().padStart(idPadStartDigits, "0"),
          lastModified: article.lastModified
            ? new Date(article.lastModified).toLocaleDateString("en-GB")
            : "-",
          createdAt: new Date(article.createdAt).toLocaleDateString("en-GB"),
        }));
        setArticles(formattedArticles);
        setPagination(response.meta);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchArticles(1, 10);
  }, [fetchArticles]);

  const handlePageChange = (page: number) => {
    fetchArticles(page, pagination.limit, searchTerm);
  };

  const handlePageSizeChange = (pageSize: number) => {
    fetchArticles(1, pageSize, searchTerm);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);

    // Debounce search requests
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchArticles(1, pagination.limit, search);
    }, 300);
  };

  // Cleanup timeout on unmount
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
