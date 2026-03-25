import { storeKeys } from "@/lib/queryKeys";
import { Stores } from "@/lib/types/store";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseInfiniteStoresParams = {
  status: string;
};

export function useInfiniteStores({ status }: UseInfiniteStoresParams) {
  return useInfiniteQuery<Stores>({
    queryKey: storeKeys.byStatus(status),
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = String(pageParam);

      const params = new URLSearchParams({
        status: status,
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
