import { getStoreProducts } from "@/lib/dal/product";
import { SortOder } from "@/lib/types/global";
import { Product } from "@prisma/client";
import DataTable from "./data-table";

interface Props {
  params: Promise<{ storeId: string }>;
  searchParams: { [key: string]: string | undefined };
}

export default async function ManageProductPage({
  params,
  searchParams,
}: Props) {
  const [{ storeId }, resolvedParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const sort = resolvedParams.sort ?? "name,asc";
  const size = resolvedParams.size ? Number(resolvedParams.size) : 5;
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;
  const name = resolvedParams.name ?? "";

  const sortKey = sort.split(",")[0] as keyof Product;
  const sortOrder = sort.split(",")[1] as SortOder;

  const products = await getStoreProducts({
    storeId,
    sortKey,
    sortOrder,
    size,
    page,
    name,
  });

  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Manage <span className="text-slate-800">Products</span>
      </h1>
      <DataTable products={products.data} pagination={products.pagination} />
    </div>
  );
}
