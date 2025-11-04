import { ordersKeys } from "@/lib/queryKeys";
import { OrdersWithPagination } from "@/lib/types/order";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteOrders() {
  return useInfiniteQuery<OrdersWithPagination>({
    queryKey: ordersKeys.all,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as string;

      const params = new URLSearchParams({
        page,
        size: "5",
        sortKey: "createdAt",
        sortOrder: "desc",
      });

      const response = await fetch(`/api/orders?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      return await response.json();
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.totalPage ? nextPage : undefined;
    },
  });
}
