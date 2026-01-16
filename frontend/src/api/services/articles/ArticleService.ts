import { Article, PaginatedResponse, PaginationParams } from "@/src/types";
import { api, endpoints } from "../../config";
import { NestResponse } from "../../responses/response";

class ArticleService {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Article>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.search) queryParams.set("search", params.search);

    const url = queryParams.toString()
      ? `${endpoints.articles.base}?${queryParams.toString()}`
      : endpoints.articles.base;

    const res = await api.get<NestResponse<PaginatedResponse<Article>>>(url, {
      cache: "no-store",
    });
    return (
      res.response ?? {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }
    );
  }

  async getById(id: string): Promise<Article | null> {
    const res = await api.get<NestResponse<Article>>(
      endpoints.articles.byId(id),
      {
        cache: "no-store",
      },
    );
    return res.response ?? null;
  }

  async create(payload: Partial<Article>): Promise<Article | null> {
    const res = await api.post<NestResponse<Article>>(
      endpoints.articles.base,
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async update(id: string, payload: Partial<Article>): Promise<Article | null> {
    const res = await api.patch<NestResponse<Article>>(
      endpoints.articles.byId(id),
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete<NestResponse<void>>(endpoints.articles.byId(id), {
        cache: "no-store",
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const articleService = new ArticleService();
