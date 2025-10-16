import { Prisma } from "@prisma/client";

export type UserReview = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: { firstName: true; lastName: true; avatarUrl: true; email: true };
    };
  };
}>;

export type GetProductReviewsParams = {
  productId: string;
};
