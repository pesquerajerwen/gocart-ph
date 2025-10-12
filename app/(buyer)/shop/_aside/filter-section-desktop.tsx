import { Separator } from "@radix-ui/react-dropdown-menu";
import { Funnel } from "lucide-react";
import CategoryFilter from "./category-filter";
import ClearAllButton from "./clear-all-button";
import PriceRangeFilter from "./price-range-filter";
import RatingsFilter from "./ratings-filter";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

export default function FilterSectionDesktop({ categories }: Props) {
  return (
    <section className="hidden lg:flex flex-col gap-6 w-60 bg-slate-50 rounded-sm p-4">
      <div className="flex gap-2 items-center">
        <Funnel className="text-slate-600 size-4" />
        <p className="text-slate-600">Search Filters</p>
      </div>

      <PriceRangeFilter />

      <Separator />

      <RatingsFilter />

      <Separator />

      <CategoryFilter categories={categories} />

      <Separator />

      <ClearAllButton />
    </section>
  );
}
