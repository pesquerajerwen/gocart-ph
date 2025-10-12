"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export default function ClearAllButton() {
  const router = useRouter();

  const [, setMinPrice] = useQueryState("minPrice");
  const [, setMaxPrice] = useQueryState("maxPrice");
  const [, setRating] = useQueryState("rating");
  const [, setCategory] = useQueryState("category");
  const [, setPage] = useQueryState("page");

  async function handleClick() {
    await Promise.all([
      setMinPrice(null),
      setMaxPrice(null),
      setRating(null),
      setCategory(null),
      setPage(null),
    ]);

    router.refresh();
  }

  return <Button onClick={handleClick}>CLEAR ALL</Button>;
}
