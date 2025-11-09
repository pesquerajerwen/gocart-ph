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

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function StatusDropdown() {
  const [selected, setSelected] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString.withDefault("")).withDefault([])
  );

  const [search, setSearch] = React.useState("");

  const handleToggle = (status: string) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleClear = () => setSelected([]);

  const filteredStatuses = statuses.filter((status) =>
    status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 p-0 border-dashed"
        >
          <PlusCircle className="h-4 w-4" />
          Status
          {selected.length > 0 && (
            <React.Fragment>
              <Separator orientation="vertical" />
              {selected.length === 1 ? (
                <Badge className="bg-slate-100 text-slate-600 capitalize">
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
            placeholder="Status"
            className="shadow-none border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 active:shadow-none"
          />
          <InputGroupAddon>
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="max-h-56 overflow-y-auto">
          {filteredStatuses.length > 0 ? (
            filteredStatuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Checkbox
                  id={status}
                  checked={selected.includes(status)}
                  onCheckedChange={() => handleToggle(status)}
                />

                <Label
                  htmlFor={status}
                  className="text-slate-600 font-normal capitalize"
                >
                  {status}
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
