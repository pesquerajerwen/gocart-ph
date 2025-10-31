import { z } from "zod";

export const createOrderSchema = z.object({
  order: z.object({
    userId: z.string().nonempty("User ID is required"),
    addressId: z.string().nonempty("AddressId is required"),
    totalAmount: z.number(),
  }),
  items: z.array(
    z.object({
      productId: z.string().nonempty(),
      productName: z.string().nonempty(),
      productPrice: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const getOrdersSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  sortKey: z
    .enum(["createdAt", "amount"])
    .default("createdAt")
    .catch("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("asc").catch("asc"),
});

export type CreateOrderParams = z.infer<typeof createOrderSchema>;
export type GetOrderParams = z.infer<typeof getOrdersSchema>;
