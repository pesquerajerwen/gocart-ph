"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Search } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";

const paymentMethods = ["Gcash", "Maya", "QRPH"];

export function PaymentDropdown() {
  const [selected, setSelected] = useQueryState(
    "payment",
    parseAsArrayOf(parseAsString.withDefault("")).withDefault([])
  );
  const [search, setSearch] = React.useState("");

  const handleToggle = (method: string) => {
    setSelected((prev) =>
      prev.includes(method)
        ? prev.filter((s) => s !== method)
        : [...prev, method]
    );
  };

  const handleClear = () => setSelected([]);

  const filteredPaymentMethods = paymentMethods.filter((method) =>
    method.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 p-0 border-dashed"
        >
          <PlusCircle className="h-4 w-4" />
          Payment
          {selected.length > 0 && (
            <React.Fragment>
              <Separator orientation="vertical" />
              {selected.length === 1 ? (
                <Badge className="bg-slate-100 text-slate-600">
                  {selected[0]}
                </Badge>
              ) : (
                <span className="text-xs">{selected.length} selected</span>
              )}
            </React.Fragment>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <InputGroup className="h-7 border-0 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 active:shadow-none">
          <InputGroupInput
            placeholder="Payment Method"
            className="shadow-none border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 active:shadow-none"
            onChange={(event) => setSearch(event.target.value)}
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="max-h-56 overflow-y-auto">
          {filteredPaymentMethods.length > 0 ? (
            filteredPaymentMethods.map((method) => (
              <DropdownMenuItem
                key={method}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Checkbox
                  id={method}
                  checked={selected.includes(method)}
                  onCheckedChange={() => handleToggle(method)}
                />

                <Label htmlFor={method} className="text-slate-600 font-normal">
                  {method}
                </Label>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem
              disabled
              className="text-sm text-muted-foreground"
            >
              No results found
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex justify-center cursor-pointer"
          onClick={handleClear}
        >
          Clear Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
