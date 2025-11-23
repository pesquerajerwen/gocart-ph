import { productReviewKeys } from "@/lib/queryKeys";
import { GetProductReviewsParams } from "@/lib/schema/product-review";
import { UserReviewsWithPagination } from "@/lib/types/review";
import { useQuery } from "@tanstack/react-query";

export function useProductReviews({
  productId,
  page,
  size,
}: GetProductReviewsParams) {
  return useQuery<UserReviewsWithPagination>({
    queryKey: productReviewKeys.detail(productId),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      const res = await fetch(`/api/products/${productId}/reviews?${params}`);

      if (!res.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!productId,
  });
}
