import { Prisma, Review, ReviewImage } from "@prisma/client";

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

export type CreateProductReviewParams = Omit<
  Review,
  "id" | "createdAt" | "updatedAt"
> & {
  images: { url: string }[];
};
