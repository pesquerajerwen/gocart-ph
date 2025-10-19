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
  categoryName: z.string().min(1, "Category ID is required"),
  productImages: z
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
};

export const createProductClientSchema = z
  .object(BASE_FIELDS)
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

export const updateProductStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["active", "deactivated"]),
});

export const getProductsSchema = z.object({
  sortKey: z
    .enum(["name", "description", "offerPrice", "actualPrice"])
    .default("name")
    .catch("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc").catch("asc"),
  size: z.coerce
    .number()
    .refine((val) => [5, 10, 20].includes(val), {
      message: "Size must be one of 5, 10, or 20",
    })
    .default(10)
    .catch(10),
  page: z.coerce
    .number()
    .min(1, { message: "Page must be 1 or greater" })
    .default(1)
    .catch(1),
  search: z.string().optional(),
  storeId: z.string().default("").catch(""),
});
