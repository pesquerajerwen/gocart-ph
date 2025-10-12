"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export default function SortFields() {
  const router = useRouter();

  const [order, setOrder] = useQueryState("order", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "" });

  return (
    <div className="flex items-center gap-3">
      <p className="text-slate-600">Sort By</p>
      <Toggle
        pressed={sortBy === "totalSales"}
        onPressedChange={async (pressed) => {
          if (pressed)
            await Promise.all([setSortBy("totalSales"), setOrder("desc")]);
          else await Promise.all([setSortBy(""), setOrder("")]);

          router.refresh();
        }}
        variant="outline"
        className="text-slate-600 w-24 bg-white"
      >
        Top Sales
      </Toggle>
      <Toggle
        pressed={sortBy === "createdAt"}
        onPressedChange={async (pressed) => {
          if (pressed)
            await Promise.all([setSortBy("createdAt"), setOrder("desc")]);
          else await Promise.all([setSortBy(""), setOrder("")]);

          router.refresh();
        }}
        variant="outline"
        className="text-slate-600 w-24 bg-white"
      >
        Latest
      </Toggle>
      <Select
        defaultValue={order}
        onValueChange={async (value) => {
          await Promise.all([setSortBy("offerPrice"), setOrder(value)]);

          router.refresh();
        }}
      >
        <SelectTrigger
          className={cn(
            "w-[180px] bg-white data-[placeholder]:text-slate-600",
            sortBy === "offerPrice" && "text-green-600"
          )}
        >
          <SelectValue placeholder="Price" className="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
