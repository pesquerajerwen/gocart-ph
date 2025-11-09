"use client";

import { Pagination } from "@/lib/types/global";
import { useShopStore } from "@/lib/zustand/shop-store";
import { ReactNode, useEffect } from "react";

type Props = {
  pagination: Pagination;
  children: ReactNode;
};

export default function DataHydrator({ pagination, children }: Props) {
  const { setPagination } = useShopStore();

  useEffect(() => {
    setPagination(pagination);
  }, [pagination, setPagination]);

  return <div>{children}</div>;
}
