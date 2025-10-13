"use client";

import StarRating from "@/components/star-rating";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/zustand/shop-store";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

export default function RatingsFilter() {
  const router = useRouter();

  const [rating, setRating] = useQueryState(
    "rating",
    parseAsInteger.withDefault(0)
  );

  const [page, setPage] = useQueryState("page");

  const { isFilterOpen, showFilter } = useShopStore();

  async function handleClick(value: number) {
    await Promise.all([
      setRating(rating === value ? null : value),
      setPage(null),
    ]);

    isFilterOpen && showFilter(false);

    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">Rating</p>
      <div className="flex flex-col gap-1">
        {[5, 4, 3, 2, 1].map((i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 cursor-pointer  p-2",
              rating === i && "bg-slate-200 rounded"
            )}
            onClick={() => handleClick(i)}
          >
            <StarRating key={i} rating={i} size={16} />
            {i > 1 && <p className="text-slate-600 text-sm">& Up</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
