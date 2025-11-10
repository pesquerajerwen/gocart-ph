"use client";

import { useStoreOrders } from "@/hooks/use-store-orders";
import { GetStoreOrdersParams } from "@/lib/schema/order";
import { SortOrder } from "@/lib/types/global";
import { useParams } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { DateField } from "./_filters/date-field";
import { PaymentDropdown } from "./_filters/payment-dropdown";
import { ProductDropdown } from "./_filters/product-dropdown";
import ResetButton from "./_filters/reset-button";
import SearchField from "./_filters/search-field";
import { StatusDropdown } from "./_filters/status-dropdown";
import { ViewOptionsDropdown } from "./_filters/view-options-dropdown";
import OrderDetailDialog from "./_order-detail-dialog.tsx";
import DataTable from "./_data-table";
import StoreOrdersPagination from "./_data-table/pagination";
import { useDebounce } from "use-debounce";

export default function Orders() {
  const { storeId } = useParams<{ storeId: string }>();

  const [sort] = useQueryState(
    "sort",
    parseAsString.withDefault("order.createdAt,desc")
  );
  const [size] = useQueryState("size", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("q", parseAsString.withDefault(""));
  const [status] = useQueryState("status", parseAsString.withDefault(""));
  const [payment] = useQueryState("payment", parseAsString.withDefault(""));
  const [product] = useQueryState("product", parseAsString.withDefault(""));
  const [from] = useQueryState("from", parseAsString.withDefault(""));
  const [to] = useQueryState("to", parseAsString.withDefault(""));

  const sortKey = sort.split(",")[0] as GetStoreOrdersParams["sortKey"];
  const sortOrder = sort.split(",")[1] as SortOrder;

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useStoreOrders({
    storeId,
    sortKey,
    sortOrder,
    size,
    page,
    status,
    payment,
    product,
    search: debouncedSearch,
    from,
    to,
  });

  const hasFilter = search || status || payment || product || from || to;

  const storeOrders = data?.data || [];
  const pagination = data?.pagination || { totalPage: 0 };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl text-slate-500">
        Store <span className="text-slate-800">Orders</span>
      </h1>
      <section className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <SearchField />
          <StatusDropdown />
          <PaymentDropdown />
          <ProductDropdown />
          <DateField />
          {hasFilter && <ResetButton />}
        </div>
        <ViewOptionsDropdown />
      </section>
      <DataTable data={storeOrders} isLoading={isLoading} />
      {!isLoading && <StoreOrdersPagination totalPage={pagination.totalPage} />}
      <OrderDetailDialog />
    </div>
  );
}
