"use client";

import { Pagination } from "@/lib/types/global";
import { ProductWithRating } from "@/lib/types/product";
import { useShopStore } from "@/zustand/shop-store";
import { ReactNode, useEffect } from "react";

type Props = {
  products: ProductWithRating[];
  pagination: Pagination;
  children: ReactNode;
};

export default function DataHydrator({
  products,
  pagination,
  children,
}: Props) {
  const { setProducts, setPagination } = useShopStore();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  useEffect(() => {
    setPagination(pagination);
  }, [pagination, setPagination]);

  return <div>{children}</div>;
}
