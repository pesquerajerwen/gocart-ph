import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/dal/categories";
import { Funnel } from "lucide-react";
import CategoryFilter from "./category-filter";
import RatingsFilter from "./ratings-filter";
import PriceRangeFilter from "./price-range-filter";
import ClearAllButton from "./clear-all-button";

export default async function FilterSection() {
  const categories = await getCategories();

  return (
    <section className="flex flex-col gap-6 w-60 bg-slate-50 rounded-sm p-4">
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
