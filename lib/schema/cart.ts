import z from "zod";

export const createCartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
});
