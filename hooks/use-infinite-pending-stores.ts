import { pendingStoreKeys } from "@/lib/queryKeys";
import { PendingStores } from "@/lib/types/store";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfinitePendingStores() {
  return useInfiniteQuery<PendingStores>({
    queryKey: pendingStoreKeys.all,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = String(pageParam);

      const params = new URLSearchParams({
        status: "pending",
        page,
        size: "10",
      });

      const response = await fetch(`/api/stores?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch pending stores");
      }

      return await response.json();
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.totalPage ? nextPage : undefined;
    },
  });
}
