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
import { barangays, Barangay } from "select-philippines-address";

export default function BarangaySelect() {
  const { watch, setValue, control } = useFormContext();
  const selectedCity = watch("city");
  const [barangayList, setBarangayList] = useState<Barangay[]>([]);

  useEffect(() => {
    if (selectedCity) {
      barangays(selectedCity).then((data) => {
        setBarangayList(data);
        setValue("barangay", "");
      });
    } else {
      setBarangayList([]);
      setValue("barangay", "");
    }
  }, [selectedCity, setValue]);

  return (
    <FormField
      control={control}
      name="barangay"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Barangay</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={!selectedCity}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Barangay" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {barangayList.map((b) => (
                <SelectItem key={b.brgy_code} value={b.brgy_code}>
                  {b.brgy_name}
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
