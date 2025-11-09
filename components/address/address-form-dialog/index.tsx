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
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { LoaderCircle } from "lucide-react";
import BarangaySelect from "./barangay-select";
import CitySelect from "./city-select";
import DefaultCheckbox from "./default-checkbox";
import FullNameField from "./full-name-field";
import useHandleSubmit from "./hooks/handle-submit";
import useInitForm from "./hooks/init-form";
import PhoneField from "./phone-field";
import ProvinceSelect from "./province-select";
import RegionSelect from "./region-select";
import StreetAddressField from "./street-field";
import ZipcodeField from "./zipcode-field";
import { useFormContext } from "react-hook-form";
import { AddressFormValues } from "@/lib/schema/address";
import useMapSelectedAddress from "./hooks/map-selected-address";
import FormSkeleton from "./skeleton";

function CreateAddressDialog() {
  const addressFormDialog = useUserAddressStore.use.addressFormDialog();
  const closeAddressFormDialog =
    useUserAddressStore.use.closeAddressFormDialog();
  const selectedAddress = useUserAddressStore.use.selectedAddress;

  const form = useFormContext<AddressFormValues>();

  const handleSubmit = useHandleSubmit();

  const { isPending: isMapping } = useMapSelectedAddress();

  return (
    <Dialog
      open={addressFormDialog.open}
      onOpenChange={(open) => !open && closeAddressFormDialog()}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-6">
          <DialogTitle>
            {!!selectedAddress ? "Update" : "New"} Address
          </DialogTitle>
        </DialogHeader>

        <div hidden={!isMapping}>
          <FormSkeleton />
        </div>

        <fieldset
          disabled={form.formState.isSubmitting || isMapping}
          hidden={isMapping}
        >
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
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
                onClick={() => closeAddressFormDialog()}
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
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}

export default function CreateAddressDialogWrapper() {
  const form = useInitForm();

  return (
    <Form {...form}>
      <CreateAddressDialog />
    </Form>
  );
}
