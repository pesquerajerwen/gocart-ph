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
import { useFormContext } from "react-hook-form";

export default function BarangaySelect() {
  const { watch, setValue, control } = useFormContext<AddressFormValues>();
  const { city: selectedCity, barangayList } = watch();

  async function handleOnChange(selectedBrgy: string) {
    if (!selectedBrgy) return;

    setValue("barangay", selectedBrgy);
  }

  return (
    <FormField
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
