import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function StockField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="stock"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-slate-500">Stock</FormLabel>
          <FormControl>
            <Input type="number" step="1" min={0} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
