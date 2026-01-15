import { User } from "@/src/types";
import { api, endpoints } from "../../config";
import { NestResponse } from "../../responses/response";

class UsersServiceClass {
  async getAll(): Promise<User[]> {
    const res = await api.get<NestResponse<User[]>>(endpoints.users.base, {
      cache: "no-store",
    });
    return res.response ?? [];
  }

  async getById(id: string): Promise<User | null> {
    const res = await api.get<NestResponse<User>>(endpoints.users.byId(id), {
      cache: "no-store",
    });
    return res.response ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await api.get<NestResponse<User | null>>(
      endpoints.users.findByEmail(email),
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async exists(email: string): Promise<boolean> {
    const res = await api.get<NestResponse<{ exists: boolean }>>(
      endpoints.users.exists(email),
      { cache: "no-store" },
    );
    return res.response?.exists ?? false;
  }

  async create(payload: Partial<User>): Promise<User | null> {
    const res = await api.post<NestResponse<User>>(
      endpoints.users.base,
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async update(id: string, payload: Partial<User>): Promise<User | null> {
    const res = await api.patch<NestResponse<User>>(
      endpoints.users.byId(id),
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete<NestResponse<void>>(endpoints.users.byId(id), {
        cache: "no-store",
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const usersService = new UsersServiceClass();
