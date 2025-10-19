import { assets } from "@/assets/assets";
import UserReviewComponent from "@/components/product-review";
import { Separator } from "@/components/ui/separator";
import { getProductReviews } from "@/lib/dal/reviews";
import Image from "next/image";
import React from "react";

type Props = {
  productId: string;
};

export default async function ProductReviews({ productId }: Props) {
  const reviews = await getProductReviews({ productId });

  if (!reviews.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 h-80">
        <Image src={assets.star} alt={"Star"} height={80} width={80} />
        <p className="text-slate-500 text-sm">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review, index) => (
        <React.Fragment key={index}>
          <UserReviewComponent {...review} />
          {index < reviews.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
