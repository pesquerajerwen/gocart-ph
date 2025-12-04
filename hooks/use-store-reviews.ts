import { storeReviewKeys } from "@/lib/queryKeys";
import { StoreReviews } from "@/lib/types/store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useStoreReviews(id: string) {
  return useQuery<StoreReviews>({
    queryKey: storeReviewKeys.list({ id }),
    queryFn: async () => {
      const res = await fetch(`/api/store/${id}/reviews`);

      if (!res.ok) {
        throw new Error("Failed to fetch store reviews");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!id,
  });
}

export function useInfiniteStoreReviews(id: string) {
  return useInfiniteQuery<StoreReviews, Error>({
    queryKey: storeReviewKeys.list({ id }),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const page = Number(pageParam) || 1;

      const params = new URLSearchParams({
        page: String(page),
        size: "10",
      });

      const response = await fetch(`/api/store/${id}/reviews?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch store reviews");
      }

      return await response.json();
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.totalPage ? nextPage : undefined;
    },
    enabled: !!id,
  });
}
