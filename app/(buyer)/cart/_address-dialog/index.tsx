"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AddressFormValues, addressSchema } from "@/lib/schema/address";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BarangaySelect from "./barangay-select";
import CitySelect from "./city-select";
import DefaultCheckbox from "./default-checkbox";
import FullNameField from "./full-name-field";
import PhoneField from "./phone-field";
import ProvinceSelect from "./province-select";
import RegionSelect from "./region-select";
import StreetAddressField from "./street-field";
import ZipcodeField from "./zipcode-field";
import { createAddressAction } from "@/lib/actions/create-address";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

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
      address: "",
      zipcode: "",
      isDefault: false,
    },
  });

  const handleSubmit = async (values: AddressFormValues) => {
    const { error } = await createAddressAction(values);

    if (error) {
      return toast.error(error.message);
    }

    closeDialog();
  };

  return (
    <Dialog
      open={addressDialog.open}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
        </DialogHeader>

        <fieldset disabled={form.formState.isSubmitting}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-3 items-start">
                <FullNameField />
                <PhoneField />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 items-start">
                <RegionSelect />
                <ProvinceSelect />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 items-start">
                <CitySelect />
                <BarangaySelect />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 items-start">
                <StreetAddressField />
                <ZipcodeField />
              </div>
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
                  {form.formState.isSubmitting ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
