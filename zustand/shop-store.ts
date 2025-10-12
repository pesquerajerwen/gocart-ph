"use client";

import { Pagination, SortOrder } from "@/lib/types/global";
import { ProductWithRating } from "@/lib/types/product";
import { Product } from "@prisma/client";
import { create } from "zustand";

export type ShopPageSearchParams = {
  sortKey?: keyof Product;
  sortOrder?: SortOrder;
  size?: number;
  page?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  categorySlugs?: string;
};

type ShopState = {
  searchParams: ShopPageSearchParams;
  products: ProductWithRating[];
  pagination: Pagination;
  setSearchParams: (searchParams: ShopPageSearchParams) => void;
  setProducts: (products: ProductWithRating[]) => void;
  setPagination: (pagination: Pagination) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  searchParams: {},
  products: [],
  pagination: {
    size: 0,
    page: 0,
    totalCount: 0,
    totalPage: 0,
  },
  setProducts: (products: ProductWithRating[]) => set({ products }),
  setPagination: (pagination: Pagination) => set({ pagination }),
  setSearchParams: (searchParams: ShopPageSearchParams) =>
    set({ searchParams }),
}));
