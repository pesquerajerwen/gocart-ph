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
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { provinces, regions } from "select-philippines-address";
import SelectItems from "./select-items";

export default function RegionSelect() {
  const { control, setValue, watch } = useFormContext<AddressFormValues>();

  const regionList = watch("regionList");

  useEffect(() => {
    async function fetchRegions() {
      const regionList = await regions();

      setValue("regionList", regionList);
    }

    fetchRegions();
  }, []);

  async function handleOnChange(selectedRegion: string) {
    const currentRegion = watch("region");

    if (selectedRegion === currentRegion) return;

    const provinceList = await provinces(selectedRegion);

    setValue("region", selectedRegion);
    setValue("provinceList", provinceList);
    setValue("province", "");
    setValue("city", "");
    setValue("barangay", "");
  }

  return (
    <FormField
      control={control}
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Region</FormLabel>
          <Select onValueChange={handleOnChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {" "}
              <SelectItems
                items={regionList}
                valueKey={"region_code"}
                labelKey={"region_name"}
              />
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
