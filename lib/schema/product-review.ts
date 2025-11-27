import z from "zod";

export const createProductReviewClientSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  images: z.array(
    z.object({
      localId: z.string(),
      url: z.url(),
    })
  ),
});

export const createProductReviewServerSchema = z.object({
  userId: z.string().nonempty(),
  productId: z.string().nonempty(),
  orderItemId: z.string().nonempty(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  images: z.array(
    z.object({
      url: z.url(),
    })
  ),
});

export const getProductReviewsSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  size: z.coerce.number().nonnegative().default(10),
  page: z.coerce.number().nonnegative().default(1),
});

export const getStoreReviewsSchema = z.object({
  storeId: z.string().nonempty("Store ID is required"),
  size: z.coerce.number().nonnegative().default(10),
  page: z.coerce.number().nonnegative().default(1),
});

export type CreateProductReviewFormValues = z.infer<
  typeof createProductReviewClientSchema
>;
export type CreateProductReviewServerParams = z.infer<
  typeof createProductReviewServerSchema
>;
export type GetProductReviewsParams = z.infer<typeof getProductReviewsSchema>;
export type GetStoreReviewsParams = z.infer<typeof getStoreReviewsSchema>;
