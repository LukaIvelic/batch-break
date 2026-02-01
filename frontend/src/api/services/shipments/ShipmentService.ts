import {
  Shipment,
  PaginatedResponse,
  PaginationParams,
  CreateShipmentDto,
  UpdateShipmentDto,
  UpdateShipmentItemDto,
  ShipmentItem,
  ShipmentStatus,
} from "@/src/types";
import { api, endpoints } from "../../config";
import { NestResponse } from "../../responses/response";

class ShipmentService {
  async getAll(
    params?: PaginationParams & { status?: ShipmentStatus },
  ): Promise<PaginatedResponse<Shipment>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.search) queryParams.set("search", params.search);
    if (params?.status) queryParams.set("status", params.status);

    const url = queryParams.toString()
      ? `${endpoints.shipments.base}?${queryParams.toString()}`
      : endpoints.shipments.base;

    const res = await api.get<NestResponse<PaginatedResponse<Shipment>>>(url, {
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

  async getById(id: string): Promise<Shipment | null> {
    const res = await api.get<NestResponse<Shipment>>(
      endpoints.shipments.byId(id),
      {
        cache: "no-store",
      },
    );
    return res.response ?? null;
  }

  async create(payload: CreateShipmentDto): Promise<Shipment | null> {
    const res = await api.post<NestResponse<Shipment>>(
      endpoints.shipments.base,
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async update(
    id: string,
    payload: UpdateShipmentDto,
  ): Promise<Shipment | null> {
    const res = await api.patch<NestResponse<Shipment>>(
      endpoints.shipments.byId(id),
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async updateItem(
    shipmentId: string,
    itemId: string,
    payload: UpdateShipmentItemDto,
  ): Promise<ShipmentItem | null> {
    const res = await api.patch<NestResponse<ShipmentItem>>(
      endpoints.shipments.updateItem(shipmentId, itemId),
      payload,
      { cache: "no-store" },
    );
    return res.response ?? null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await api.delete<NestResponse<void>>(endpoints.shipments.byId(id), {
        cache: "no-store",
        body: {},
      });
      return true;
    } catch {
      return false;
    }
  }

  async scanArticle(barcode: string): Promise<ShipmentItem | null> {
    const res = await api.post<NestResponse<ShipmentItem>>(
      endpoints.shipments.scan(barcode),
      {},
      { cache: "no-store" },
    );
    return res.response ?? null;
  }
}

export const shipmentService = new ShipmentService();
