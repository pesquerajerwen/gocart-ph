import { Prisma } from "@prisma/client";
import { Pagination } from "./global";

export type UserReview = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: { firstName: true; lastName: true; avatarUrl: true; email: true };
    };
    images: true;
  };
}>;

export type UserReviewsWithPagination = {
  data: UserReview[];
  pagination: Pagination;
};
