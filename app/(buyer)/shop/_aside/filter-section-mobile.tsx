import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Category } from "@prisma/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Funnel } from "lucide-react";
import { Fragment } from "react";
import CategoryFilter from "./category-filter";
import ClearAllButton from "./clear-all-button";
import PriceRangeFilter from "./price-range-filter";
import RatingsFilter from "./ratings-filter";

type Props = {
  categories: Category[];
};

export default function FilterSectionMobile({ categories }: Props) {
  return (
    <Fragment>
      <SheetContent side="left" className="" aria-describedby="">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 items-center">
              <Funnel className="text-slate-600 size-4" />
              <p className="text-slate-600">Search Filters</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <section className="overflow-auto px-4 flex flex-col gap-3">
          <PriceRangeFilter />

          <Separator />

          <RatingsFilter />

          <Separator />

          <CategoryFilter categories={categories} />

          <Separator />
        </section>

        <SheetFooter>
          <ClearAllButton />
        </SheetFooter>
      </SheetContent>
    </Fragment>
  );
}
