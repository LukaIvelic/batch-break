import { z } from "zod";
import { ShipmentItemStatus } from "../Shipment";

export const ShipmentItemSchema = z.object({
  articleId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  scannedQuantity: z.number().int().nonnegative().optional(),
  status: z.nativeEnum(ShipmentItemStatus).optional(),
});
