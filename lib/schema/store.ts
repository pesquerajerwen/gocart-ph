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
  avatar_url: z.url("Image URL is required"),
});

export type CreateStoreServerValues = z.infer<typeof createStoreServerSchema>;
