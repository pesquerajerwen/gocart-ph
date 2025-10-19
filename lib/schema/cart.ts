import z from "zod";

export const createCartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const updateCartItemQuantitySchema = { ...createCartSchema };

export const deleteCartItemSchema = z.object({
  productId: z.string(),
});
