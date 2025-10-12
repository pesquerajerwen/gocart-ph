"use client";

import { ReactNode, useEffect } from "react";
import { useCategoryStore } from "@/zustand/categories-store";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
  children: ReactNode;
};

export default function DataHydrator({ categories, children }: Props) {
  const { setCategories } = useCategoryStore();

  useEffect(() => {
    setCategories(categories);
  }, [categories, setCategories]);

  return <div>{children}</div>;
}
