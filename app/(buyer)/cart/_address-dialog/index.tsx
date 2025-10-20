"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUserAddressStore } from "@/zustand/user-address-store";
import BarangaySelect from "./barangay-select";
import CitySelect from "./city-select";
import DefaultCheckbox from "./default-checkbox";
import FullNameField from "./full-name-field";
import PhoneField from "./phone-field";
import ProvinceSelect from "./province-select";
import RegionSelect from "./region-select";
import StreetAddressField from "./street-field";
import { Separator } from "@/components/ui/separator";

export const addressSchema = z.object({
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
  streetAddress: z.string().min(1, "Street address is required"),
  isDefault: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressDialog() {
  const { addressDialog, closeDialog } = useUserAddressStore();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      streetAddress: "",
      isDefault: false,
    },
  });

  const handleSubmit = (values: AddressFormValues) => {
    console.log("Form submitted:", values);
    closeDialog();
  };

  return (
    <Dialog
      open={addressDialog.open}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FullNameField />
            <PhoneField />
            <RegionSelect />
            <ProvinceSelect />
            <CitySelect />
            <BarangaySelect />
            <StreetAddressField />
            <DefaultCheckbox />

            <Separator />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => closeDialog()}
                className="w-24"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-24">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
