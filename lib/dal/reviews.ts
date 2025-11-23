import { prisma } from "../db/client";
import {
  CreateProductReviewServerParams,
  GetProductReviewsParams,
} from "../schema/product-review";

export async function getProductReviews({
  productId,
  page = 1,
  size = 10,
}: GetProductReviewsParams) {
  const skip = (page - 1) * size;

  const [reviews, count] = await Promise.all([
    prisma.review.findMany({
      skip,
      take: size,
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
        images: true,
      },
    }),
    prisma.review.count({ where: { productId } }),
  ]);

  return {
    data: reviews,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function createProductReview(
  review: CreateProductReviewServerParams
) {
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
