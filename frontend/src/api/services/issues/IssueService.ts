import { CreateIssuePayload, Issue } from "@/src/types";
import { api, endpoints } from "../../config";
import { NestResponse } from "../../responses/response";

class IssueService {
  async getAll(): Promise<Issue[]> {
    const res = await api.get<NestResponse<Issue[]>>(endpoints.issues.base, {
      cache: "no-store",
    });
    return res.response ?? [];
  }

  async getById(id: string): Promise<Issue | null> {
    const res = await api.get<NestResponse<Issue>>(endpoints.issues.byId(id), {
      cache: "no-store",
    });
    return res.response ?? null;
  }

  async getByShipmentId(shipmentId: string): Promise<Issue[]> {
    const res = await api.get<NestResponse<Issue[]>>(
      endpoints.issues.byShipmentId(shipmentId),
      { cache: "no-store" },
    );
    return res.response ?? [];
  }

  async create(payload: Partial<CreateIssuePayload>): Promise<Issue | null> {
    const res = await api.post<NestResponse<Issue>>(
      endpoints.issues.base,
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async update(id: string, payload: Partial<Issue>): Promise<Issue | null> {
    const res = await api.patch<NestResponse<Issue>>(
      endpoints.issues.updateIssue(id),
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete<NestResponse<void>>(endpoints.issues.byId(id), {
        cache: "no-store",
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const issuesService = new IssueService();
