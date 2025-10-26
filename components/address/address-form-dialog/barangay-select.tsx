"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressFormValues } from "@/lib/schema/address";
import { Controller, useFormContext } from "react-hook-form";
import SelectItems from "./select-items";

export default function BarangaySelect() {
  const { setValue, watch, control } = useFormContext<AddressFormValues>();
  const selectedCity = watch("city");
  const barangayList = watch("barangayList");

  async function handleOnChange(selectedBrgy: string) {
    if (!selectedBrgy) return;

    setValue("barangay", selectedBrgy);
  }

  return (
    <Controller
      control={control}
      name="barangay"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Barangay</FormLabel>
          <Select
            onValueChange={handleOnChange}
            value={field.value}
            disabled={!selectedCity}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Barangay" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItems
                items={barangayList}
                valueKey={"brgy_code"}
                labelKey={"brgy_name"}
              />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
