import DataTable from "./data-table";
import OrderDetailDialog from "./_order-detail-dialog.tsx";
import { getStoreOrders } from "@/lib/dal/store-order";
import { SortOrder } from "@/lib/types/global";
import { GetStoreOrdersParams } from "@/lib/schema/order";
import StoreOrdersPagination from "./pagination";

type Props = {
  params: Promise<{ storeId: string }>;
  searchParams: { [key: string]: string | undefined };
};

export default async function Orders({ params, searchParams }: Props) {
  const [{ storeId }, resolvedParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const sort = resolvedParams.sort ?? "name,asc";
  const size = resolvedParams.size ? Number(resolvedParams.size) : 5;
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;
  const search = resolvedParams.search ?? "";

  const sortKey = sort.split(",")[0] as GetStoreOrdersParams["sortKey"];
  const sortOrder = sort.split(",")[1] as SortOrder;

  const { data, pagination } = await getStoreOrders({
    storeId,
    sortKey,
    sortOrder,
    size,
    page,
    search,
  });

  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Store <span className="text-slate-800">Orders</span>
      </h1>
      <DataTable data={data} />
      <StoreOrdersPagination totalPage={pagination.totalPage} />
      <OrderDetailDialog />
    </div>
  );
}
