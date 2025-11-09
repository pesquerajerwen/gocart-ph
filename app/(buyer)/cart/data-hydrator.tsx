"use client";

import { CartItemWithProduct } from "@/lib/types/cart";
import { Pagination } from "@/lib/types/global";
import { useCartStore } from "@/lib/zustand/cart-store";
import { useShopStore } from "@/lib/zustand/shop-store";
import { ReactNode, useEffect } from "react";

type Props = {
  cartItems: CartItemWithProduct[];
  children: ReactNode;
};

export default function DataHydrator({ cartItems, children }: Props) {
  const { setCartItems } = useCartStore();

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  return children;
}
