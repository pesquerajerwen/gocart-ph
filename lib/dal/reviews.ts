import { prisma } from "../db/client";
import {
  CreateProductReviewParams,
  GetProductReviewsParams,
} from "../types/review";

export async function getProductReviews({
  productId,
}: GetProductReviewsParams) {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatarUrl: true,
          email: true,
        },
      },
    },
  });
}

export async function createProductReview(review: CreateProductReviewParams) {
  return prisma.review.create({
    data: review,
  });
}
