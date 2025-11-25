"use client";

import { Category } from "@/generated/prisma/client";
import { create } from "zustand";

interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
}));
