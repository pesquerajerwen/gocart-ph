import { Prisma } from "@/generated/prisma/client";
import { Pagination } from "./global";

export type StoreOrder = Prisma.OrderItemGetPayload<{
  include: {
    order: {
      include: { address: true; payments: true };
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

export type StoreProducts = {
  data: Prisma.ProductGetPayload<{
    include: {
      productImages: {
        select: { id: true; url: true; isPrimary: true };
        orderBy: { isPrimary: "desc" };
      };
    };
  }>[];
  pagination: Pagination;
};

export type StoreOrders = {
  data: Prisma.OrderItemGetPayload<{
    include: {
      order: {
        include: { payments: true; address: true };
      };
    };
  }>[];
  pagination: Pagination;
};
