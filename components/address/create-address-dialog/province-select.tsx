"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { provinces, Province } from "select-philippines-address";

export default function ProvinceSelect() {
  const { watch, setValue, control } = useFormContext();
  const selectedRegion = watch("region");
  const [provinceList, setProvinceList] = useState<Province[]>([]);

  useEffect(() => {
    if (selectedRegion) {
      provinces(selectedRegion).then((data) => {
        setProvinceList(data);
        setValue("province", "");
        setValue("city", "");
        setValue("barangay", "");
      });
    } else {
      setProvinceList([]);
      setValue("province", "");
      setValue("city", "");
      setValue("barangay", "");
    }
  }, [selectedRegion, setValue]);

  return (
    <FormField
      control={control}
      name="province"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Province</FormLabel>
          <Select
            onValueChange={field.onChange}
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
