import { Prisma } from "@prisma/client";
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
        product: { select: { productImages: true } };
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

export type StoreOrder = Prisma.OrderItemGetPayload<{
  include: {
    order: {
      include: { user: true; payments: true };
    };
  };
}> & {
  coupon?: string; // TODO: apply the coupon implementation
};

export type StoreOrderDetail = Prisma.OrderItemGetPayload<{
  include: {
    order: {
      include: { user: true; payments: true; address: true };
    };
    product: {
      select: {
        productImages: true;
        store: true;
      };
    };
  };
}> & {
  coupon?: string; // TODO: apply the coupon implementation
};

export type FinalizeOrderPaymentParams = {
  orderId: string;
  sessionId: string;
  paymentId: string;
  amount: number;
  paymentMethodType: string;
  paidAt: Date;
};
