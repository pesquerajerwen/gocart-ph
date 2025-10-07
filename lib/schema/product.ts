import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    actualPrice: z.number().positive("Actual price must be a positive number"),
    offerPrice: z.number().nonnegative("Offer price must be zero or positive"),
    categoryId: z.string().min(1, "Category ID is required"),
    categoryName: z.string().min(1, "Category name is required"),
  })
  .refine((data) => data.offerPrice <= data.actualPrice, {
    message: "Offer price cannot be greater than actual price",
    path: ["offerPrice"],
  });

export type CreateProductValues = z.infer<typeof createProductSchema>;
