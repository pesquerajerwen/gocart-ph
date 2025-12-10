import {
  Prisma,
  Product,
  ProductImage,
  ProductStatus,
} from "@/generated/prisma/client";
import { StaticImageData } from "next/image";

type ProductPrices = {
  actualPrice: number;
  offerPrice: number;
};

export type ProductWithImages = Omit<
  Prisma.ProductGetPayload<{
    include: {
      productImages: {
        select: { id: true; url: true; isPrimary: true };
      };
    };
  }>,
  "actualPrice" | "offerPrice"
> &
  ProductPrices;

export type ProductWithImagesAndStore = ProductWithImages & {
  store: Prisma.StoreGetPayload<{
    select: { id: true; slug: true; name: true; avatarUrl: true };
  }>;
};

export type ProductWithPrimaryImage = ProductPrices &
  Omit<Product, "actualPrice" | "offerPrice"> & {
    primaryImageUrl: string;
  };

export type GetProductsParams = {
  sortKey?: string;
  sortOrder?: string;
  size?: number;
  page?: number;
  search?: string;
};

export type GetProductParams = {
  id: string;
};

export type GetProductsWithRatingParams = GetProductsParams & {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  categorySlugs?: string;
};

export type CreateProductParams = Omit<
  ProductWithImages,
  "id" | "createdAt" | "updatedAt" | "productImages"
> & {
  productImages: Omit<ProductImage, "id" | "productId">[];
};

export type UpdateProductStatusParams = {
  id: string;
  status: ProductStatus;
};
