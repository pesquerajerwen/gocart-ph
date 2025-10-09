import { ProductStatus } from "@prisma/client";
import { prisma } from "../db/client";
import {
  CreateProductParams,
  GetProductsParams,
  UpdateProductStatusParams,
} from "../types/product";

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

export async function getProducts({
  sortKey = "name",
  sortOrder = "asc",
  size = 10,
  page = 1,
  name,
}: GetProductsParams = {}) {
  const skip = (page - 1) * size;

  const where = {
    ...(name && {
      name: {
        contains: name,
        mode: "insensitive" as const,
      },
    }),
  };

  console.log("page", page);

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
