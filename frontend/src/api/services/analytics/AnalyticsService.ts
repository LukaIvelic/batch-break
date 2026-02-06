import { AnalyticsOverview } from "@/src/types";
import { api, endpoints } from "../../config";
import { NestResponse } from "../../responses/response";

class AnalyticsService {
  async getOverview(): Promise<AnalyticsOverview | null> {
    const res = await api.get<NestResponse<AnalyticsOverview>>(
      endpoints.analytics.overview,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }
}

export const analyticsService = new AnalyticsService();
