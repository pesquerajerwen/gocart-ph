"use client";

import {
  FormControl,
  FormField,
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
import { useFormContext } from "react-hook-form";
import { barangays } from "select-philippines-address";
import SelectItems from "./select-items";
import { useMemo } from "react";

export default function CitySelect() {
  const { watch, setValue, control } = useFormContext<AddressFormValues>();
  const { province: selectedProvince, cityList } = watch();

  async function handleOnChange(selectedCity: string) {
    if (!selectedCity) return;

    setValue("city", selectedCity);

    const barangayList = await barangays(selectedCity);

    setValue("barangayList", barangayList);
    setValue("barangay", "");
  }

  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City / Municipality</FormLabel>
          <Select
            onValueChange={handleOnChange}
            value={field.value}
            disabled={!selectedProvince}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City / Municipality" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItems
                items={cityList}
                valueKey={"city_code"}
                labelKey={"city_name"}
              />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
