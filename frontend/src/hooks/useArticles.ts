"use client";

import { useQuery } from "@tanstack/react-query";
import { articleService } from "@/src/api/services/articles/ArticleService";
import { Article, PaginatedResponse, PaginationParams } from "@/src/types";

export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  list: (params: PaginationParams) => [...articleKeys.lists(), params] as const,
  details: () => [...articleKeys.all, "detail"] as const,
  detail: (id: string) => [...articleKeys.details(), id] as const,
};

export function useArticles(params: PaginationParams) {
  return useQuery<PaginatedResponse<Article>>({
    queryKey: articleKeys.list(params),
    queryFn: () => articleService.getAll(params),
    staleTime: Infinity,
  });
}

export function useArticle(id: string) {
  return useQuery<Article | null>({
    queryKey: articleKeys.detail(id),
    queryFn: () => articleService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  });
}
