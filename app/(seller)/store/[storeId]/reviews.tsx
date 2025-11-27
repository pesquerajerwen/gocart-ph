"use client";

import { Fragment } from "react";
import ReviewItem from "./review-item";
import { Separator } from "@/components/ui/separator";
import { useStoreReviews } from "@/hooks/use-store-reviews";
import { useParams } from "next/navigation";
import ReviewsSkeleton from "./reviews-skeleton";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Reviews() {
  const { storeId } = useParams<{ storeId: string }>();

  const { data: storeReviews, isLoading } = useStoreReviews(storeId + "asd");

  if (isLoading) return <ReviewsSkeleton />;

  if (!storeReviews?.data || storeReviews.data.length === 0)
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
        {storeReviews.data.map((storeReview, index) => (
          <Fragment key={index}>
            <ReviewItem storeReview={storeReview} />
            {index < storeReviews.data.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
