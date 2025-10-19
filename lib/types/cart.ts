import { CartItem, Prisma } from "@prisma/client";
import { ProductWithImages } from "./product";

export type CreateCartParams = Pick<
  CartItem,
  "userId" | "productId" | "quantity"
>;

export type CartItemWithProduct = CartItem & {
  product: ProductWithImages;
};
