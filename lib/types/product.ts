import { Prisma, Product, ProductImage, ProductStatus } from "@prisma/client";
import { SortOder } from "./global";

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: {
    productImages: {
      select: { id: true; url: true; isPrimary: true };
    };
  };
}>;

export type ClientSideProduct = Omit<
  ProductWithImages,
  "actualPrice" | "offerPrice"
> & {
  actualPrice: number;
  offerPrice: number;
};

export type GetProductsParams = {
  sortKey?: keyof Product;
  sortOrder?: SortOder;
  size?: number;
  page?: number;
  name?: string;
};

export type CreateProductParams = Omit<
  ClientSideProduct,
  "id" | "createdAt" | "updatedAt" | "productImages"
> & {
  productImages: Omit<ProductImage, "id" | "productId">[];
};

export type UpdateProductStatusParams = {
  id: string;
  status: ProductStatus;
};
