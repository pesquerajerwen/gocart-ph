"use client";

import { assets } from "@/assets/assets";
import { InfiniteScrollLoader } from "@/components/infinite-scroll-loader";
import { Separator } from "@/components/ui/separator";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { useInfiniteStoreReviews } from "@/hooks/use-store-reviews";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ReviewItem from "./review-item";
import ReviewsSkeleton from "./reviews-skeleton";

export default function Reviews() {
  const { storeId } = useParams<{ storeId: string }>();
  const {
    data: storeReviews,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteStoreReviews(storeId);

  const { ref } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage,
    threshold: 0.25,
  });

  if (isLoading) return <ReviewsSkeleton />;

  const pages = storeReviews?.pages ?? [];
  const reviews = pages.flatMap((p) => p.data);

  if (!reviews.length)
    return (
      <div className="flex flex-col justify-center items-center gap-3 h-80">
        <Image src={assets.star} alt={"Star"} height={80} width={80} />
        <p className="text-slate-400 text-center">No Reviews Yet</p>
        <p className="text-slate-300 max-w-80 text-center">
          Reviews will show up here once customers start sharing feedback
        </p>
      </div>
    );

  return (
    <div>
      <p className="text-slate-500 my-10">Total Reviews</p>
      <div className="flex flex-col gap-6 mb-40">
        {reviews.map((storeReview, index) => (
          <Fragment key={index}>
            <ReviewItem storeReview={storeReview} />
            {index < reviews.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
      <InfiniteScrollLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
      />

      <div ref={ref} className="h-10" />
    </div>
  );
}
