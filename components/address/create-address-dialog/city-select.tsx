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
import { cities, City } from "select-philippines-address";

export default function CitySelect() {
  const { watch, setValue, control } = useFormContext();
  const selectedProvince = watch("province");
  const selectedCity = watch("city");
  const [cityList, setCityList] = useState<City[]>([]);

  useEffect(() => {
    if (selectedProvince) {
      cities(selectedProvince).then((data) => {
        setCityList(data);
        setValue("city", "");
        setValue("barangay", "");
      });
    } else {
      setCityList([]);
      setValue("city", "");
      setValue("barangay", "");
    }
  }, [selectedProvince, setValue]);

  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City / Municipality</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={!selectedProvince}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City / Municipality" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {cityList.map((c) => (
                <SelectItem key={c.city_code} value={c.city_code}>
                  {c.city_name}
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
