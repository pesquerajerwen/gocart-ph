import { getProducts } from "@/lib/dal/product";
import { SortOder } from "@/lib/types/global";
import { Product } from "@prisma/client";
import DataTable from "./data-table";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function ManageProductPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const sort = resolvedParams.sort ?? "name,asc";
  const size = resolvedParams.size ? Number(resolvedParams.size) : 5;
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;
  const name = resolvedParams.name ?? "";

  const sortKey = sort.split(",")[0] as keyof Product;
  const sortOrder = sort.split(",")[1] as SortOder;

  const products = await getProducts({
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
