import { ordersKeys } from "@/lib/queryKeys";
import { StoreOrderDetail } from "@/lib/types/order";
import { useQuery } from "@tanstack/react-query";

export function useOrderDetails(id: string) {
  return useQuery<StoreOrderDetail>({
    queryKey: ordersKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/order-items/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!id,
  });
}
