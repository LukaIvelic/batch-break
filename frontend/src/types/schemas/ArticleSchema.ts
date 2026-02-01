import { z } from "zod";

export const ArticleSchema = z.object({
  barcode: z.string().length(13, "Barcode must be exactly 13 characters long"),
});
