import { Prisma } from "@/generated/prisma/client";
import { CartItemWithProduct } from "./cart";
import { PaymentMethodType } from "./paymongo";
import { Pagination } from "./global";

export type PlaceOrderActionParams = {
  items: CartItemWithProduct[];
  paymentMethod: PaymentMethodType;
  addressId: string;
};

export type Orders = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        review: true;
        product: { select: { productImages: true; reviews: true } };
      };
    };
    address: true;
  };
}>[];

export type OrdersWithPagination = {
  data: Orders;
  pagination: Pagination;
};

export type OrderItemWithProductImages = Prisma.OrderItemGetPayload<{
  include: {
    product: { select: { productImages: true } };
  };
}>;

export type FinalizeOrderPaymentParams = {
  orderId: string;
  sessionId: string;
  paymentId: string;
  amount: number;
  paymentMethodType: string;
  paidAt: Date;
};
