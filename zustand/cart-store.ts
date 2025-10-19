"use client";

import { CartItemWithProduct } from "@/lib/types/cart";
import { ProductWithImages } from "@/lib/types/product";
import { create } from "zustand";

interface CartState {
  cartItems: CartItemWithProduct[];
  removeItemDialog: {
    product: ProductWithImages | null;
    open: boolean;
  };
  setCartItems: (cartItems: CartItemWithProduct[]) => void;
  openRemoveItemDialog: ({ product }: { product: ProductWithImages }) => void;
  closeRemoveItemDialog: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  removeItemDialog: {
    product: null,
    open: false,
  },
  setCartItems: (cartItems: CartItemWithProduct[]) => set({ cartItems }),
  openRemoveItemDialog: ({ product }: { product: ProductWithImages }) =>
    set({
      removeItemDialog: {
        open: true,
        product,
      },
    }),
  closeRemoveItemDialog: () =>
    set((state) => ({
      removeItemDialog: {
        ...state.removeItemDialog,
        open: false,
      },
    })),
}));
