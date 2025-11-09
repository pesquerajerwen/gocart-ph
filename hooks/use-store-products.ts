import { storeProductKeys } from "@/lib/queryKeys";
import { StoreProducts } from "@/lib/types/store";
import { useQuery } from "@tanstack/react-query";

export function useStoreProducts(id: string) {
  return useQuery<StoreProducts>({
    queryKey: storeProductKeys.all,
    queryFn: async () => {
      const res = await fetch(`/api/store/${id}/products`);

      if (!res.ok) {
        throw new Error("Failed to fetch store products");
      }

      const data = await res.json();
      return data;
    },
    enabled: !!id,
  });
}
