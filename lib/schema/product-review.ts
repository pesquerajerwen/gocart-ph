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
  productId: z.string(),
  orderItemId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  images: z.array(
    z.object({
      url: z.url(),
    })
  ),
});

export type CreateProductReviewFormValues = z.infer<
  typeof createProductReviewClientSchema
>;
