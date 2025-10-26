import { getSearchParams } from "@/utils/get-search-params";

export default async function getSearchPayload() {
  const searchParams = await getSearchParams();

  const sortBy = searchParams.get("sortBy") ?? "name";
  const order = searchParams.get("order") ?? "asc";
  const size = Number(searchParams.get("size") ?? 20);
  const page = Number(searchParams.get("page") ?? 1);
  const rating = searchParams.get("rating")
    ? Number(searchParams.get("rating"))
    : undefined;
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const categorySlugs = searchParams.get("category") ?? "";
  const search = searchParams.get("search") ?? "";

  return {
    sortKey: sortBy,
    sortOrder: order,
    size,
    page,
    rating,
    minPrice,
    maxPrice,
    categorySlugs,
    search,
  };
}
