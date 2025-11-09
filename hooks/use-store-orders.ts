import { storeOrdersKeys } from "@/lib/queryKeys";
import { GetStoreOrdersParams } from "@/lib/schema/order";
import { StoreOrders } from "@/lib/types/store";
import { useQuery } from "@tanstack/react-query";

export function useStoreOrders(params: GetStoreOrdersParams) {
  const { storeId, ...rest } = params;

  return useQuery<StoreOrders>({
    queryKey: storeOrdersKeys.list(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        ...rest,
        size: rest.size.toString(),
        page: rest.page.toString(),
      });

      const res = await fetch(`/api/store/${storeId}/orders?${searchParams}`);

      if (!res.ok) {
        throw new Error("Failed to fetch store orders");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!storeId,
  });
}
