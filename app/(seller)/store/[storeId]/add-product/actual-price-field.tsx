import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function ActualPriceField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="actualPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-slate-500">Actual Price ($)</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
