"use client";

import { useInfiniteStores } from "@/hooks/use-infinite-stores";
import EmptyState from "./empty";
import StoreList from "./store-list";

export const LIVE_STORE_STATUS = ["verified", "deactivated"];

export default function StoresPage() {
  const { data, isLoading } = useInfiniteStores({
    status: LIVE_STORE_STATUS.join(","),
  });

  if (!isLoading && (!data || data?.pages?.[0].data.length === 0)) {
    return <EmptyState />;
  }

  return (
    <div className=" w-full">
      <h1 className="text-2xl text-slate-500">
        Live <span className="text-slate-800">Stores</span>
      </h1>

      <section className="mt-8">
        <StoreList />
      </section>
    </div>
  );
}
