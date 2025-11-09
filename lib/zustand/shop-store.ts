"use client";

import { Pagination } from "@/lib/types/global";
import { ProductWithRating } from "@/lib/types/product";
import { create } from "zustand";

type ShopState = {
  isFilterOpen: boolean;
  products: ProductWithRating[];
  pagination: Pagination;
  showFilter: (show: boolean) => void;
  setProducts: (products: ProductWithRating[]) => void;
  setPagination: (pagination: Pagination) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  isFilterOpen: false,
  products: [],
  pagination: {
    size: 0,
    page: 0,
    totalCount: 0,
    totalPage: 0,
  },
  showFilter: (show: boolean) => set({ isFilterOpen: show }),
  setProducts: (products: ProductWithRating[]) => set({ products }),
  setPagination: (pagination: Pagination) => set({ pagination }),
}));
