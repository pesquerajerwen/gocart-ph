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
import { useStoreProducts } from "@/hooks/use-store-products";
import { PlusCircle, Search, X } from "lucide-react";
import { useParams } from "next/navigation";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { useState } from "react";

export function ProductDropdown() {
  const { storeId } = useParams<{ storeId: string }>();

  // TODO: Save the filters in the DB to prevent reaching the URL limit

  const [selected, setSelected] = useQueryState(
    "product",
    parseAsArrayOf(parseAsString.withDefault("")).withDefault([])
  );

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data: response, isLoading } = useStoreProducts(storeId);

  const products = response?.data || [];

  const handleToggle = (product: string) => {
    setSelected((prev) =>
      prev.includes(product)
        ? prev.filter((s) => s !== product)
        : [...prev, product]
    );
  };

  const handleClear = () => setSelected([]);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 p-0 border-dashed"
          onClick={() => setOpen((prev) => !prev)}
        >
          <PlusCircle className="h-4 w-4" />
          Product
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
              <div onClick={handleClear}>
                <X className="size-4 " />
              </div>
            </React.Fragment>
          )}
        </Button>
      </DropdownMenuTrigger>

      {isLoading ? (
        <DropdownMenuContent className="w-56">
          <p className="text-center text-sm">Loading...</p>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          className="w-56"
          onInteractOutside={() => setOpen(false)}
        >
          <InputGroup className="h-7 border-0 focus-visible:ring-0">
            <InputGroupInput
              placeholder="Status"
              className="shadow-none border-0  focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search className="h-4 w-4 text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="max-h-56 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <DropdownMenuItem
                  key={product.id}
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Checkbox
                    id={product.id}
                    checked={selected.includes(product.name)}
                    onCheckedChange={() => handleToggle(product.name)}
                  />

                  <Label
                    htmlFor={product.id}
                    className="text-slate-600 font-normal"
                  >
                    {product.name}
                  </Label>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem
                disabled
                className="text-sm text-muted-foreground h-32 justify-center"
              >
                {search.length > 0
                  ? "No results found"
                  : "No products available"}
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
      )}
    </DropdownMenu>
  );
}
