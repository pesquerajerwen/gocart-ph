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
  const { images, ...rest } = review;

  return prisma.review.create({
    data: {
      ...rest,
      images: {
        create: images,
      },
    },
  });
}
