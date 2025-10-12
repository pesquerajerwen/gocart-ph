import { getProductsWithRating } from "@/lib/dal/product";
import FilterSection from "./_aside/filter-section";
import HeaderSection from "./_header/header-section";
import SearchResult from "./_header/search-result";
import ProductList from "./_main/product-list";
import DataHydrator from "./data-hydrator";
import getSearchPayload from "./search-params";
import { Suspense } from "react";
import ProductListSkeleton from "./_main/product-list-skeleton";
import FilterSectionMobile from "./_aside/filter-section-mobile";
import { Sheet } from "@/components/ui/sheet";

export default async function ShopPage() {
  const searchPayload = await getSearchPayload();

  const productsWithRating = await getProductsWithRating(searchPayload);

  return (
    <Sheet>
      <DataHydrator pagination={productsWithRating.pagination}>
        <div className="px-6 max-w-7xl mx-auto mt-10 mb-40 space-y-8 ">
          <div className="flex gap-6">
            <FilterSection />
            <div className="flex flex-col gap-6 flex-1">
              <SearchResult />
              <HeaderSection />
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList />
              </Suspense>
            </div>
          </div>
        </div>
      </DataHydrator>
    </Sheet>
  );
}
