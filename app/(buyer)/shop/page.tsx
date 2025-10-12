import { getProductsWithRating } from "@/lib/dal/product";
import { SortOder } from "@/lib/types/global";
import { Product } from "@prisma/client";
import FilterSection from "./_aside/filter-section";
import HeaderSection from "./_header/header-section";
import ProductList from "./_main/product-list";
import DataHydrator from "./data-hydrator";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function ShopPage({ searchParams }: Props) {
  const [resolvedParams] = await Promise.all([searchParams]);

  const sortBy = resolvedParams.sortBy ?? "name";
  const order = resolvedParams.order ?? "asc";
  const size = resolvedParams.size ? Number(resolvedParams.size) : 5;
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;
  const name = resolvedParams.name ?? "";
  const rating = resolvedParams.rating
    ? Number(resolvedParams.rating)
    : undefined;

  const minPrice = resolvedParams.minPrice
    ? Number(resolvedParams.minPrice)
    : undefined;
  const maxPrice = resolvedParams.maxPrice
    ? Number(resolvedParams.maxPrice)
    : undefined;

  const categorySlugs = resolvedParams.category ?? "";

  const productsWithRating = await getProductsWithRating({
    sortKey: sortBy as keyof Product,
    sortOrder: order as SortOder,
    size,
    page,
    name,
    minPrice,
    maxPrice,
    rating,
    categorySlugs,
  });

  return (
    <DataHydrator
      products={productsWithRating.data}
      pagination={productsWithRating.pagination}
    >
      <div className="px-6 max-w-7xl mx-auto mt-10 mb-40 space-y-8 ">
        <div className="flex gap-6">
          <FilterSection />
          <div className="flex flex-col gap-6 flex-1">
            <HeaderSection />
            <ProductList products={productsWithRating.data} />
          </div>
        </div>
      </div>
    </DataHydrator>
  );
}
