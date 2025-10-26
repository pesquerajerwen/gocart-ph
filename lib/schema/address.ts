import z from "zod";

export const addAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .transform((val) => val.replace(/\s+/g, "").replace(/^0/, "")) // strip spaces + 0
    .refine((val) => /^9\d{9}$/.test(val), "Invalid Phone"),
  region: z.string().min(1, "Region is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  barangay: z.string().min(1, "Barangay is required"),
  address: z.string().min(1, "Street address is required"),
  zipcode: z.string().min(1, "Zip code is required"),
  isDefault: z.boolean().default(false),
  regionList: z
    .array(z.object({ region_code: z.string(), region_name: z.string() }))
    .optional(),
  provinceList: z
    .array(z.object({ province_code: z.string(), province_name: z.string() }))
    .optional(),
  cityList: z
    .array(z.object({ city_code: z.string(), city_name: z.string() }))
    .optional(),
  barangayList: z
    .array(z.object({ brgy_code: z.string(), brgy_name: z.string() }))
    .optional(),
});

export const updateAddressSchema = z.object({
  ...addAddressSchema.shape,
  id: z.string().min(1, "Address ID is required"),
});

export type AddressFormValues = z.input<typeof addAddressSchema>;
