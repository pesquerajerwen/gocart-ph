"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStoreOrdersStore } from "@/lib/zustand/store-orders";
import { Settings2 } from "lucide-react";

const columns = ["payment", "coupon", "status", "date"];

export function ViewOptionsDropdown() {
  const hiddenColumns = useStoreOrdersStore.use.hiddenColumns();
  const showColumn = useStoreOrdersStore.use.showColumn();
  const hideColumn = useStoreOrdersStore.use.hideColumn();

  function handleChange(column: string) {
    hiddenColumns.includes(column) ? showColumn(column) : hideColumn(column);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column}
            checked={!hiddenColumns.includes(column)}
            onCheckedChange={() => handleChange(column)}
            className="capitalize"
          >
            {column}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
