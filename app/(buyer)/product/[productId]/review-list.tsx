"use client";

import ListPagination from "@/components/list-pagination";
import UserReviewComponent from "@/components/product-review";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/lib/types/global";
import { UserReview } from "@/lib/types/review";
import React from "react";

type Props = {
  reviews: UserReview[];
  pagination: Pagination;
};

export default function ReviewList({ reviews, pagination }: Props) {
  return (
    <div className="space-y-8">
      {reviews.map((review, index) => (
        <React.Fragment key={index}>
          <UserReviewComponent {...review} />
          {index < reviews.length - 1 && <Separator />}
        </React.Fragment>
      ))}
      <ListPagination
        currentPage={pagination.page}
        totalPages={pagination.totalPage}
        onPageChange={(page) => null}
      />
    </div>
  );
}
