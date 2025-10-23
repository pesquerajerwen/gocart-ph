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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressFormValues } from "@/lib/schema/address";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cities } from "select-philippines-address";

export default function ProvinceSelect() {
  const { watch, setValue, control } = useFormContext<AddressFormValues>();
  const { region: selectedRegion, provinceList } = watch();

  const onChange = useCallback(handleOnChange, []);

  async function handleOnChange(selectedProvince: string) {
    if (!selectedProvince) return;

    setValue("province", selectedProvince);

    const cityList = await cities(selectedProvince);

    setValue("cityList", cityList);
    setValue("city", "");
    setValue("barangay", "");
  }

  return (
    <FormField
      control={control}
      name="province"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Province</FormLabel>
          <Select
            onValueChange={onChange}
            value={field.value}
            disabled={!selectedRegion}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {provinceList.map((p) => (
                <SelectItem key={p.province_code} value={p.province_code}>
                  {p.province_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
