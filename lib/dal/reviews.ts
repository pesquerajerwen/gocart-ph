import { prisma } from "../db/client";
import {
  CreateProductReviewServerParams,
  GetProductReviewsParams,
  GetStoreReviewsParams,
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

export async function getStoreReviews({
  storeId,
  page = 1,
  size = 10,
}: GetStoreReviewsParams) {
  const skip = (page - 1) * size;

  const [reviews, count] = await Promise.all([
    prisma.review.findMany({
      skip,
      take: size,
      where: { product: { storeId } },
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
        product: {
          include: {
            category: true,
          },
        },
      },
    }),
    prisma.review.count({ where: { product: { storeId } } }),
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
  const { images, productId, ...rest } = review;

  return prisma.$transaction(async (tx) => {
    const createdReview = await tx.review.create({
      data: {
        ...rest,
        productId,
        images: {
          create: images,
        },
      },
    });

    await tx.product.update({
      where: { id: productId },
      data: {
        totalRating: { increment: review.rating },
        totalReviews: { increment: 1 },
      },
    });

    return createdReview;
  });
}
