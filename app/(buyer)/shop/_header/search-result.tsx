"use client";

import { SearchCheck } from "lucide-react";
import { useQueryState } from "nuqs";

export default function SearchResult() {
  const [search] = useQueryState("search");

  if (!search) return null;

  return (
    <div className="flex items-center gap-1 text-slate-600">
      <SearchCheck className="size-4" />
      <p>
        Search result for '<span className="text-green-600">{search}</span>'
      </p>
    </div>
  );
}
