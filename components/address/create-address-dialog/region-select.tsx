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
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Region, regions } from "select-philippines-address";

export default function RegionSelect() {
  const { control } = useFormContext();

  const [regionList, setRegionList] = useState<Region[]>([]);

  useEffect(() => {
    async function fetchRegions() {
      const regionList = await regions();

      setRegionList(regionList);
    }

    fetchRegions();
  }, []);

  return (
    <FormField
      control={control}
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Region</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {regionList.map((r) => (
                <SelectItem key={r.region_code} value={r.region_code}>
                  {r.region_name}
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
