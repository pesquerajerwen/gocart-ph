"use client";

import { useInfinitePendingStores } from "@/hooks/use-infinite-pending-stores";
import EmptyState from "./empty";
import StoreList from "./store-list";

export default function ApproveStore() {
  const { data, isLoading } = useInfinitePendingStores();

  if (!isLoading && (!data || data?.pages?.[0].data.length === 0)) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl text-slate-500">
        Approve <span className="text-slate-800">Stores</span>
      </h1>

      <section className="mt-8">
        <StoreList />
      </section>
    </div>
  );
}
