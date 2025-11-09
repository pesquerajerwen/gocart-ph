"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

export default function SearchField() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  return (
    <InputGroup className="w-full sm:w-56">
      <InputGroupInput
        placeholder="Search Order"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {search && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            aria-label="Help"
            size="icon-xs"
            className="rounded-full"
            onClick={() => setSearch(null)}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
