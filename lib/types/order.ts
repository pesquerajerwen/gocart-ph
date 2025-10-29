import { Order, OrderItem } from "@prisma/client";
import { ProductWithImages } from "./product";
import { PaymentMethodType } from "./paymongo";
import { CartItemWithProduct } from "./cart";

export type CreateOrderParams = {
  order: Pick<Order, "userId" | "addressId" | "totalAmount">;
  items: Pick<
    OrderItem,
    "productId" | "productName" | "productPrice" | "quantity" | "subtotal"
  >[];
};

export type PlaceOrderActionParams = {
  items: CartItemWithProduct[];
  paymentMethod: PaymentMethodType;
  addressId: string;
};
