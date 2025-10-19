import { CartItem } from "@prisma/client";
import { ProductWithImages } from "./product";

export type CartItemWithProduct = CartItem & {
  product: ProductWithImages;
};

export type CreateCartParams = Pick<
  CartItem,
  "userId" | "productId" | "quantity"
>;

export type UpdateCartItemQuantityParams = Pick<
  CartItem,
  "userId" | "productId" | "quantity"
>;

export type DeleteCartItemParams = Pick<CartItem, "userId" | "productId">;
