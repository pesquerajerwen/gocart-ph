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
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { cities } from "select-philippines-address";
import SelectItems from "./select-items";

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

  const filteredProvinceList = useMemo(
    () =>
      provinceList?.filter(
        (province) => province.province_name !== "City Of Manila"
      ),
    [provinceList]
  );

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
              <SelectTrigger className="w-full truncate">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItems
                items={filteredProvinceList}
                valueKey={"province_code"}
                labelKey={"province_name"}
              />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
