"use client";

import { assets } from "@/assets/assets";
import ListPagination from "@/components/list-pagination";
import ProductReview from "@/components/product-review";
import ProductReviewSkeleton from "@/components/product-review-skeleton";
import { Separator } from "@/components/ui/separator";
import { useProductReviews } from "@/hooks/use-product-reviews";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  productId: string;
};

export default function ProductReviews({ productId }: Props) {
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useProductReviews({
    productId,
    page,
    size: 10,
  });

  if (isLoading) {
    return <ProductReviewSkeleton />;
  }

  if (!response?.data.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 h-80">
        <Image src={assets.star} alt={"Star"} height={80} width={80} />
        <p className="text-slate-500 text-sm">No reviews yet</p>
      </div>
    );
  }

  const { data: reviews, pagination } = response;

  return (
    <div className="space-y-8">
      {reviews.map((review, index) => (
        <React.Fragment key={index}>
          <ProductReview {...review} />
          {index < reviews.length - 1 && <Separator />}
        </React.Fragment>
      ))}
      <div className="flex justify-end">
        {pagination.totalPage > 1 && (
          <div>
            <ListPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPage}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
