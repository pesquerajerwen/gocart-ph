import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const BASE_STORE_FIELDS = {
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  email: z.email("Invalid email address"),
  contact: z.string().nonempty("Contact number is required"),
  address: z.string().nonempty("Address is required"),
};

export const createStoreClientSchema = z.object({
  ...BASE_STORE_FIELDS,
  image: z
    .file("Store Logo is required")
    .refine((file) => file instanceof File, { message: "No file provided" })
    .refine((file: File) => file.size <= MAX_FILE_SIZE, {
      message: `File too large. Max ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
    }),
  imageUrl: z.string(),
});

export type CreateStoreClientValues = z.infer<typeof createStoreClientSchema>;

export const createStoreServerSchema = z.object({
  ...BASE_STORE_FIELDS,
  userId: z.string().nonempty("User ID is required"),
  avatarUrl: z.url("Image URL is required"),
});

export const getStoreProductsSchema = z.object({
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

export type CreateStoreServerValues = z.infer<typeof createStoreServerSchema>;

export type GetStoreProductsParams = z.infer<typeof getStoreProductsSchema>;
