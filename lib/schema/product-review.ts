import z from "zod";

export const createProductReviewClientSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
});

export const createProductReviewServerSchema = z.object({
  productId: z.string(),
  orderItemId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
});

export type CreateProductReviewFormValues = z.infer<
  typeof createProductReviewClientSchema
>;
