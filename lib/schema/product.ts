import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const BASE_FIELDS = {
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  actualPrice: z.coerce
    .number()
    .positive("Actual price must be a positive number"),
  offerPrice: z.coerce
    .number()
    .nonnegative("Offer price must be zero or positive"),
  stock: z.coerce.number().nonnegative("Stock must be zero or positive"),
  categoryId: z.string().min(1, "Category ID is required"),
};

export const createProductClientSchema = z
  .object({
    ...BASE_FIELDS,
    images: z
      .array(
        z
          .object({
            image: z
              .file()
              .optional()
              .refine(
                (file) =>
                  file === undefined ||
                  (file instanceof File && file.size <= MAX_FILE_SIZE),
                {
                  message: `Invalid file or file too large. Max ${
                    MAX_FILE_SIZE / (1024 * 1024)
                  } MB`,
                }
              ),
            url: z.string().optional(),
            isPrimary: z.boolean().optional(),
          })
          .optional()
      )
      .min(1, { message: "At least one image is required" })
      .refine(
        (images) => {
          const first = images?.[0];
          return first && first.image instanceof File;
        },
        {
          message: "Image is required",
          path: [0, "image"],
        }
      ),
  })
  .refine((data) => data.offerPrice <= data.actualPrice, {
    message: "Offer price cannot be greater than actual price",
    path: ["offerPrice"],
  });

export const createProductServerSchema = z
  .object(BASE_FIELDS)
  .refine((data) => data.offerPrice <= data.actualPrice, {
    message: "Offer price cannot be greater than actual price",
    path: ["offerPrice"],
  });

export type CreateProductServerValues = z.infer<
  typeof createProductServerSchema
>;
export type CreateProductClientValues = z.infer<
  typeof createProductClientSchema
>;
