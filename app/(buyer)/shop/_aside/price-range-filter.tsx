"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useShopStore } from "@/zustand/shop-store";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { z } from "zod";

const priceRangeSchema = z
  .object({
    min: z.number().min(0, "Min price must be at least 0"),
    max: z.number().min(0, "Max price must be at least 0"),
  })
  .refine((data) => data.max >= data.min, {
    message: "Max price must be higher than Min price",
    path: ["max"],
  });

export default function PriceRangeFilter() {
  const router = useRouter();

  const [page, setPage] = useQueryState("page");

  const { isFilterOpen, showFilter } = useShopStore();

  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(0)
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(0)
  );

  const [min, setMin] = useState<string | number>(minPrice);
  const [max, setMax] = useState<string | number>(maxPrice);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    !minPrice && setMin("");
    !maxPrice && setMax("");
  }, [minPrice, maxPrice]);

  const handleApply = async () => {
    const result = priceRangeSchema.safeParse({ min, max });

    if (!result.success) {
      setError("Please input valid price range");
      return;
    }

    setError(null);

    await Promise.all([
      setMinPrice(min as number),
      setMaxPrice(max as number),
      setPage(null),
    ]);

    isFilterOpen && showFilter(false);

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">Price Range</p>
      <div className="grid grid-cols-5 gap-2 items-center">
        <Input
          type="number"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="bg-white placeholder:text-slate-600 col-span-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="$ Min"
        />
        <Separator />
        <Input
          type="number"
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className={`bg-white placeholder:text-slate-600 col-span-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          placeholder="$ Max"
        />
      </div>

      {error && <p className="text-xs text-center text-red-500">{error}</p>}

      <Button onClick={handleApply}>APPLY</Button>
    </div>
  );
}
