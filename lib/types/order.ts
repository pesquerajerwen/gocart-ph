import { Prisma } from "@prisma/client";
import { CartItemWithProduct } from "./cart";
import { PaymentMethodType } from "./paymongo";

export type PlaceOrderActionParams = {
  items: CartItemWithProduct[];
  paymentMethod: PaymentMethodType;
  addressId: string;
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
