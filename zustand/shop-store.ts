"use client";

import { Pagination } from "@/lib/types/global";
import { ProductWithRating } from "@/lib/types/product";
import { create } from "zustand";

interface ShopState {
  products: ProductWithRating[];
  pagination: Pagination;
  setProducts: (products: ProductWithRating[]) => void;
  setPagination: (pagination: Pagination) => void;
}

export const useShopStore = create<ShopState>((set) => ({
  products: [],
  pagination: {
    size: 0,
    page: 0,
    totalCount: 0,
    totalPage: 0,
  },
  setProducts: (products: ProductWithRating[]) => set({ products }),
  setPagination: (pagination: Pagination) => set({ pagination }),
}));
