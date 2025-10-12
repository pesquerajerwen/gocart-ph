"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

type Props = {
  categories: Category[];
};

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter();

  const [URLcategories, setURLCategories] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [page, setPage] = useQueryState("page");

  const [seeMore, setSeeMore] = useState(false);

  async function handleClick(value: string, checked: boolean) {
    if (checked) await setURLCategories((old) => [...old, value]);
    else await setURLCategories((old) => old.filter((v) => v !== value));

    await setPage(null);

    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">By Category</p>
      {categories.map((category, i) => {
        if (!seeMore && i > 4) return null;

        return (
          <div key={category.id} className="flex items-center gap-2 ">
            <Checkbox
              id={category.name}
              checked={URLcategories.includes(category.slug)}
              onCheckedChange={(checked) =>
                handleClick(category.slug, checked as boolean)
              }
            />
            <label
              htmlFor={category.name}
              className="cursor-pointer text-sm text-slate-600"
            >
              {category.name}
            </label>
          </div>
        );
      })}
      {!seeMore && (
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => setSeeMore(true)}
        >
          <p className="text-slate-800 text-sm">More</p>
          <ChevronDown className="text-slate-800 size-4" />
        </div>
      )}
    </div>
  );
}
