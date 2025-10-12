import { ProductStatus } from "@prisma/client";
import { prisma } from "../db/client";
import {
  CreateProductParams,
  GetProductsWithRatingParams,
  GetStoreProductsParams,
  UpdateProductStatusParams,
} from "../types/product";
import z from "zod";

const sortSchema = z.object({
  sortKey: z.enum(["totalSales", "totalPrice", "createdAt"]),
  sortOder: z.enum(["asc", "desc"]),
});

export async function getProductsWithRating({
  sortKey = "name",
  sortOrder = "asc",
  size = 10,
  page = 1,
  name,
  minPrice,
  maxPrice,
  rating,
  categorySlugs,
}: GetProductsWithRatingParams = {}) {
  const skip = (page - 1) * size;

  const parsedSort = sortSchema.safeParse({ sortKey, sortOrder });

  const where = {
    ...(name && {
      name: {
        contains: name,
        mode: "insensitive" as const,
      },
    }),
    ...(rating && {
      totalRating: {
        gte: rating,
      },
    }),
    ...(categorySlugs && {
      categorySlug: {
        in: categorySlugs?.split(","),
      },
    }),
    ...(minPrice &&
      maxPrice && {
        offerPrice: {
          gte: minPrice,
          lte: maxPrice,
        },
      }),
    status: ProductStatus.active,
  };

  const orderBy = parsedSort.success ? { [sortKey]: sortOrder } : {};

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: size + 1,
      include: {
        productImages: {
          select: { id: true, url: true, isPrimary: true },
          orderBy: { isPrimary: "desc" },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  // TODO: Join the review table
  const safeProducts = products.map((p) => {
    const { productImages, ...rest } = p;

    return {
      ...rest,
      actualPrice: p.actualPrice.toNumber(),
      offerPrice: p.offerPrice.toNumber(),
      primaryImageUrl: p.productImages[0].url,
      rating: 0,
    };
  });

  return {
    data: safeProducts,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function getStoreProducts({
  sortKey = "name",
  sortOrder = "asc",
  size = 10,
  page = 1,
  name,
  storeId,
}: GetStoreProductsParams) {
  const skip = (page - 1) * size;

  const where = {
    storeId,
    ...(name && {
      name: {
        contains: name,
        mode: "insensitive" as const,
      },
    }),
  };

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { [sortKey]: sortOrder },
      skip,
      take: size + 1,
      include: {
        productImages: {
          select: { id: true, url: true, isPrimary: true },
          orderBy: { isPrimary: "desc" },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const safeProducts = products.map((p) => ({
    ...p,
    actualPrice: p.actualPrice.toNumber(),
    offerPrice: p.offerPrice.toNumber(),
  }));

  return {
    data: safeProducts,
    pagination: {
      page,
      size,
      totalCount: count,
      totalPage: Math.ceil(count / size),
    },
  };
}

export async function createProduct(data: CreateProductParams) {
  const { productImages, ...rest } = data;

  return prisma.product.create({
    data: {
      ...rest,
      productImages: {
        create: productImages,
      },
    },
  });
}

export async function updateProductStatus({
  id,
  status,
}: UpdateProductStatusParams) {
  return prisma.product.update({
    data: {
      status,
    },
    where: { id },
  });
}
