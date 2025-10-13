"use client";

import { Sheet } from "@/components/ui/sheet";
import { useShopStore } from "@/zustand/shop-store";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FilterSheet({ children }: Props) {
  const { isFilterOpen, showFilter } = useShopStore();

  return (
    <Sheet open={isFilterOpen} onOpenChange={showFilter}>
      {children}
    </Sheet>
  );
}
