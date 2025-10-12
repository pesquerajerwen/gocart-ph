import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Funnel } from "lucide-react";
import { Fragment, ReactNode } from "react";
import CategoryFilter from "./category-filter";
import ClearAllButton from "./clear-all-button";
import PriceRangeFilter from "./price-range-filter";
import RatingsFilter from "./ratings-filter";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

export default function FilterSectionMobile({ categories }: Props) {
  return (
    <Fragment>
      <SheetContent side="left" className="px-4" aria-describedby="">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 items-center">
              <Funnel className="text-slate-600 size-4" />
              <p className="text-slate-600">Search Filters</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <PriceRangeFilter />

        <Separator />

        <RatingsFilter />

        <Separator />

        <CategoryFilter categories={categories} />

        <Separator />

        <ClearAllButton />
      </SheetContent>
    </Fragment>
  );
}
