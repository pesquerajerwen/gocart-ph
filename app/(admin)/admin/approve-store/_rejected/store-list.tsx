"use client";

import { InfiniteScrollLoader } from "@/components/infinite-scroll-loader";
import StoreCard from "@/components/store-card";
import { StoreStatus } from "@/generated/prisma/enums";
import { useInfiniteStores } from "@/hooks/use-infinite-stores";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import dayjs from "dayjs";
import React from "react";
import EmptyState from "./empty";
import StoreCardSkeleton from "../skeleton";

export default function RejectedStoreList() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteStores({ status: StoreStatus.rejected });

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
              variant="declined"
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
            />
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
