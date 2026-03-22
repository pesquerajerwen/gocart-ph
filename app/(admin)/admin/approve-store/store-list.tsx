"use client";

import { InfiniteScrollLoader } from "@/components/infinite-scroll-loader";
import StoreCard from "@/components/store-card";
import { useInfinitePendingStores } from "@/hooks/use-infinite-pending-stores";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import dayjs from "dayjs";
import { capitalize } from "lodash";
import React from "react";
import ApproveButton from "./approve-button";
import EmptyState from "./empty";
import RejectButton from "./reject-button";
import StoreCardSkeleton from "./skeleton";

export default function StoreList() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfinitePendingStores();

  const { ref } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage,
    threshold: 0.25,
  });

  if (isLoading) {
    return <StoreCardSkeleton />;
  }

  if (!data || data?.pages?.[0].data.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="space-y-6">
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((store) => (
            <StoreCard
              key={store.id}
              logo={store.avatarUrl}
              name={store.name}
              username={store.name.replace(/\s+/g, "").toLowerCase()}
              statusLabel={capitalize(store.status)}
              description={store.description}
              address={store.address}
              phone={store.contact}
              email={store.user?.email || ""}
              appliedDate={dayjs(store.createdAt).format("MMMM D, YYYY")}
              applicantName={store.user.firstName + " " + store.user.lastName}
              applicantEmail={store.user?.email || ""}
              applicantAvatar={store.user?.avatarUrl || ""}
            >
              <StoreCard.Action>
                <ApproveButton storeId={store.id} />
                <RejectButton storeId={store.id} />
              </StoreCard.Action>
            </StoreCard>
          ))}
        </React.Fragment>
      ))}
      <InfiniteScrollLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
      />

      <div ref={ref} className="h-10" />
    </section>
  );
}
