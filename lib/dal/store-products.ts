import { prisma } from "../db/client";
import {
  GetStoreProductsParams,
  getStoreProductsSchema,
} from "../schema/store";

export async function getStoreProducts(props: GetStoreProductsParams) {
  const parseGetProductPayload = getStoreProductsSchema.safeParse(props);

  const { data, error } = parseGetProductPayload;

  if (error) throw new Error(error.message);

  const { page, size, search, sortKey, sortOrder, storeId, slug } = data;

  const skip = (page - 1) * size;

  const where = {
    ...(storeId && { storeId }),
    ...(slug && { store: { slug } }),
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
    primaryImageUrl: p.productImages[0].url,
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
