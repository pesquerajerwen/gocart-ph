import { ProductStatus } from "@prisma/client";
import z from "zod";
import { prisma } from "../db/client";
import {
  CreateProductParams,
  GetProductParams,
  GetProductsWithRatingParams,
  GetStoreProductsParams,
  UpdateProductStatusParams,
} from "../types/product";
import { getProductsSchema } from "../schema/product";

const sortSchema = z.object({
  sortKey: z.enum(["totalSales", "offerPrice", "createdAt"]),
  sortOrder: z.enum(["asc", "desc"]),
});

export async function getProductsWithRating({
  sortKey = "name",
  sortOrder = "asc",
  size = 10,
  page = 1,
  search,
  minPrice,
  maxPrice,
  rating,
  categorySlugs,
}: GetProductsWithRatingParams = {}) {
  const skip = (page - 1) * size;

  const parsedSort = sortSchema.safeParse({ sortKey, sortOrder });

  const where = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
      description: {
        contains: search,
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
      take: size,
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

export async function getStoreProducts(props: GetStoreProductsParams) {
  const parseGetProductPayload = getProductsSchema.safeParse(props);

  const { data, error } = parseGetProductPayload;

  if (error) throw new Error(error.message);

  const { page, size, search, sortKey, sortOrder, storeId } = data;

  const skip = (page - 1) * size;

  const where = {
    storeId,
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),
  };

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { [sortKey]: sortOrder },
      skip,
      take: size,
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

export async function getProduct({ id }: GetProductParams) {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      productImages: {
        select: { id: true, url: true, isPrimary: true },
        orderBy: { isPrimary: "desc" },
      },
    },
  });

  return product
    ? {
        ...product,
        actualPrice: product.actualPrice.toNumber(),
        offerPrice: product.offerPrice.toNumber(),
      }
    : null;
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
