import { getProductsWithRating } from "@/lib/dal/product";
import { Suspense } from "react";
import FilterSection from "./_aside/filter-section";
import HeaderSection from "./_header/header-section";
import SearchResult from "./_header/search-result";
import ProductList from "./_main/product-list";
import ProductListSkeleton from "./_main/product-list-skeleton";
import DataHydrator from "./data-hydrator";
import FilterSheet from "./filter-sheet";
import getSearchPayload from "./search-params";

export default async function ShopPage() {
  const searchPayload = await getSearchPayload();

  const productsWithRating = await getProductsWithRating(searchPayload);

  return (
    <FilterSheet>
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
    </FilterSheet>
  );
}
