"use client";

import { CartItemWithProduct } from "@/lib/types/cart";
import { ProductWithImages } from "@/lib/types/product";
import { Address } from "@prisma/client";
import { create } from "zustand";
import { createSelectors } from "./selector";

interface CartState {
  cartItems: CartItemWithProduct[];
  selectedAddress: Address | null;
  removeItemDialog: {
    product: ProductWithImages | null;
    open: boolean;
  };
  setCartItems: (cartItems: CartItemWithProduct[]) => void;
  selectAddress: (address: Address) => void;
  openRemoveItemDialog: ({ product }: { product: ProductWithImages }) => void;
  closeRemoveItemDialog: () => void;
}

const useCartStoreBase = create<CartState>((set) => ({
  cartItems: [],
  selectedAddress: null,
  removeItemDialog: {
    product: null,
    open: false,
  },
  setCartItems: (cartItems: CartItemWithProduct[]) => set({ cartItems }),
  selectAddress: (address: Address) => set({ selectedAddress: address }),
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

export const useCartStore = createSelectors(useCartStoreBase);
