"use client";

import { InfiniteScrollLoader } from "@/components/infinite-scroll-loader";
import StoreCard from "@/components/store-card";
import { useInfiniteStores } from "@/hooks/use-infinite-stores";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import dayjs from "dayjs";
import React from "react";
import StoreCardAction from "./card-action";
import EmptyState from "./empty";
import { LIVE_STORE_STATUS } from "./page";
import StoreCardSkeleton from "./skeleton";

export default function StoreList() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteStores({
      status: LIVE_STORE_STATUS.join(","),
    });

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
              status={store.status}
              description={store.description}
              address={store.address}
              phone={store.contact}
              email={store.email || ""}
              appliedDate={dayjs(store.createdAt).format("MMMM D, YYYY")}
              applicantName={store.user.firstName + " " + store.user.lastName}
              applicantEmail={store.user?.email || ""}
              applicantAvatar={store.user?.avatarUrl || ""}
            >
              <StoreCard.Action>
                <StoreCardAction storeId={store.id} status={store.status} />
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
