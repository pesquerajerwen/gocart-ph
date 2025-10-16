import { Cart } from "@prisma/client";

export type CreateCartParams = Pick<Cart, "userId" | "productId" | "quantity">;
