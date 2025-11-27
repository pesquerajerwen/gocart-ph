import { storeReviewKeys } from "@/lib/queryKeys";
import { StoreReviews } from "@/lib/types/store";
import { useQuery } from "@tanstack/react-query";

export function useStoreReviews(id: string) {
  return useQuery<StoreReviews>({
    queryKey: storeReviewKeys.all,
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
