"use client";

import { useCartStore } from "@/zustand/cart-store";
import CartItem from "./cart-item";

export default function CartItemList() {
  const { cartItems } = useCartStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 sm:grid-cols-6 items-center">
        <div className="col-span-3">
          <p className="text-slate-600 font-medium max-sm:text-sm">Product</p>
        </div>
        <div className="col-span-1 flex justify-center max-sm:text-sm">
          <p className="text-slate-600 font-medium">Quantity</p>
        </div>
        <div className="col-span-1 flex justify-center max-sm:text-sm">
          <p className="text-slate-600 font-medium">Total Price</p>
        </div>
        <div className="col-span-1 flex justify-center max-sm:hidden">
          <p className="text-slate-600 font-medium">Remove</p>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}
