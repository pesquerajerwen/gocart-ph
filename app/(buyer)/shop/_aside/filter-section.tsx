import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/dal/categories";
import { Funnel } from "lucide-react";
import CategoryFilter from "./category-filter";
import RatingsFilter from "./ratings-filter";
import PriceRangeFilter from "./price-range-filter";
import ClearAllButton from "./clear-all-button";
import FilterSectionMobile from "./filter-section-mobile";
import { Fragment } from "react";
import FilterSectionDesktop from "./filter-section-desktop";

export default async function FilterSection() {
  const categories = await getCategories();

  return (
    <Fragment>
      <FilterSectionMobile categories={categories} />
      <FilterSectionDesktop categories={categories} />
    </Fragment>
  );
}
