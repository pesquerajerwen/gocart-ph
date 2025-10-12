import { Prisma, Product, ProductImage, ProductStatus } from "@prisma/client";
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

export type ProductWithRating = ProductPrices &
  Omit<
    Product, // TODO: include the review table
    "actualPrice" | "offerPrice"
  > & {
    rating: number;
    primaryImageUrl: string | StaticImageData; // TODO: Remove static image when the homepage is not using dummy data anymore
  };

export type GetProductsParams = {
  sortKey?: string;
  sortOrder?: string;
  size?: number;
  page?: number;
  search?: string;
};

export type GetStoreProductsParams = GetProductsParams & {
  storeId: string;
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
