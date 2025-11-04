import { getStoreOrders } from "@/lib/dal/order";
import DataTable from "./data-table";
import OrderDetailDialog from "./_order-detail-dialog.tsx";

type Props = {
  params: Promise<{ storeId: string }>;
};

export default async function Orders({ params }: Props) {
  const { storeId } = await params;

  const data = await getStoreOrders({
    storeId,
    sortKey: "order.createdAt",
    sortOrder: "desc",
    size: 10,
    page: 1,
  });

  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Store <span className="text-slate-800">Orders</span>
      </h1>
      <DataTable data={data} />
      <OrderDetailDialog />
    </div>
  );
}
