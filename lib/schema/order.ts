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
  size: z.coerce.number().nonnegative().default(5),
  page: z.coerce.number().nonnegative().default(1),
});

export const getOrderCountSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
});

export const getStoreOrdersSchema = z.object({
  storeId: z.string().nonempty("Store ID is required"),
  sortKey: z
    .enum(["order.id", "order.createdAt", "total", "status"])
    .default("order.createdAt")
    .catch("order.createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("asc").catch("desc"),
  size: z.coerce.number().nonnegative().default(5),
  page: z.coerce.number().nonnegative().default(1),
  search: z.string().optional(),
});

export const getStoreOrderDetailsSchema = z.object({
  orderItemId: z.string().nonempty("Order Item ID is required"),
});

export const updateStoreOrderStatusSchema = z.object({
  id: z.string().nonempty("ID is required"),
  status: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

export type CreateOrderParams = z.infer<typeof createOrderSchema>;
export type GetOrderParams = z.infer<typeof getOrdersSchema>;
export type GetOrderCountParams = z.infer<typeof getOrderCountSchema>;
export type GetStoreOrdersParams = z.infer<typeof getStoreOrdersSchema>;
export type GetStoreOrderDetailsParams = z.infer<
  typeof getStoreOrderDetailsSchema
>;
export type UpdateStoreOrderStatusParams = z.infer<
  typeof updateStoreOrderStatusSchema
>;
