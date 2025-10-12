"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export default function ClearAllButton() {
  const router = useRouter();

  const [minPrice, setMinPrice] = useQueryState("minPrice");
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice");
  const [rating, setRating] = useQueryState("rating");
  const [search, setSearch] = useQueryState("search");
  const [category, setCategory] = useQueryState("category");
  const [page, setPage] = useQueryState("page");

  async function handleClick() {
    await Promise.all([
      setMinPrice(null),
      setMaxPrice(null),
      setRating(null),
      setSearch(null),
      setCategory(null),
      setPage(null),
    ]);

    router.refresh();
  }

  return <Button onClick={handleClick}>CLEAR ALL</Button>;
}
