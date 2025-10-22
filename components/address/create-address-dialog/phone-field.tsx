"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";

export default function PhoneField() {
  const { control } = useFormContext();

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    let formatted = digits;

    if (digits.length === 11 && digits.startsWith("0")) {
      formatted = digits.slice(1);
    }

    if ([10, 11].includes(formatted.length)) {
      return `${formatted.slice(0, 3)} ${formatted.slice(
        3,
        6
      )} ${formatted.slice(6)}`;
    }

    return formatted;
  };

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupAddon>(+63)</InputGroupAddon>
              <InputGroupInput
                placeholder="Phone number"
                {...field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatPhoneNumber(e.target.value);

                  console.log("formatted", formatted);
                  field.onChange(formatted);
                }}
                value={field.value || ""}
              />
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
