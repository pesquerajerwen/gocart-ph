"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePrimaryAddress } from "@/hooks/use-primary-address";
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function DefaultCheckbox() {
  const { control, setValue } = useFormContext();

  const { data: primaryAddress } = usePrimaryAddress();

  const selectedAddress = useUserAddressStore.use.selectedAddress();

  useEffect(() => {
    setValue("isDefault", !!primaryAddress ? false : true);
  }, [primaryAddress]);

  if (!primaryAddress) return null;

  return (
    <FormField
      control={control}
      name="isDefault"
      render={({ field }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={selectedAddress?.isDefault}
                />
              </FormControl>
              <FormLabel className="font-normal">
                Set as default address
              </FormLabel>
            </FormItem>
          </TooltipTrigger>
          {selectedAddress?.isDefault && (
            <TooltipContent
              className="w-60 text-center"
              align="start"
              side="bottom"
              sideOffset={10}
            >
              The default address cannot be un-selected. You can set another
              address as a default address instead.
            </TooltipContent>
          )}
        </Tooltip>
      )}
    />
  );
}
