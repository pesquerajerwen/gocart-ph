"use client";

import { CartItemWithProduct } from "@/lib/types/cart";
import { ProductWithImages } from "@/lib/types/product";
import { Address } from "@prisma/client";
import { create } from "zustand";
import { createSelectors } from "./selector";
import { PaymentMethodType } from "@/lib/types/paymongo";

interface CartState {
  cartItems: CartItemWithProduct[];
  selectedAddress: Address | null;
  selectedPaymentMethod: PaymentMethodType | null;
  removeItemDialog: {
    product: ProductWithImages | null;
    open: boolean;
  };
  setCartItems: (cartItems: CartItemWithProduct[]) => void;
  selectAddress: (address: Address) => void;
  selectPaymentMethod: (paymentMethod: PaymentMethodType) => void;
  openRemoveItemDialog: ({ product }: { product: ProductWithImages }) => void;
  closeRemoveItemDialog: () => void;
}

const useCartStoreBase = create<CartState>((set) => ({
  cartItems: [],
  selectedAddress: null,
  selectedPaymentMethod: null,
  removeItemDialog: {
    product: null,
    open: false,
  },
  setCartItems: (cartItems: CartItemWithProduct[]) => set({ cartItems }),
  selectAddress: (address: Address) => set({ selectedAddress: address }),
  selectPaymentMethod: (paymentMethod: PaymentMethodType) =>
    set({ selectedPaymentMethod: paymentMethod }),
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
