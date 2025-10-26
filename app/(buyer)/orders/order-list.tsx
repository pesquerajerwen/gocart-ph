"use client";

import { useCartStore } from "@/zustand/cart-store";
import OrderItem from "./order-item";
import { Separator } from "@/components/ui/separator";

export default function OrderList() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 sm:grid-cols-6 items-center">
        <div className="col-span-2">
          <p className="text-slate-600 font-medium max-sm:text-sm">Product</p>
        </div>
        <div className="col-span-1 flex justify-center max-sm:text-sm">
          <p className="text-slate-600 font-medium">Total Price</p>
        </div>
        <div className="col-span-2 flex justify-center max-sm:text-sm">
          <p className="text-slate-600 font-medium">Address</p>
        </div>
        <div className="col-span-1 flex justify-center max-sm:hidden">
          <p className="text-slate-600 font-medium">Status</p>
        </div>
      </div>
      <div className="space-y-6">
        <OrderItem />
        <Separator />
        <OrderItem />
        <Separator />
        <OrderItem />
        <Separator />
        <OrderItem />
        <Separator />
        <OrderItem />
      </div>
    </div>
  );
}
