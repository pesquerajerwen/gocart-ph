import { addressKeys } from "@/lib/queryKeys";
import { Address } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";

export function usePrimaryAddress() {
  return useQuery<Address>({
    queryKey: addressKeys.primary,
    queryFn: async () => {
      const res = await fetch(`/api/addresses/primary`);

      if (!res.ok) {
        throw new Error("Failed to fetch primary address");
      }

      const data = await res.json();
      return data;
    },
  });
}
