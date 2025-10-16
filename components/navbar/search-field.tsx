"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { FormEvent, useEffect, useState } from "react";

export default function NavSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useQueryState("search", {
    defaultValue: "",
    history: "replace",
  });

  const [, setPage] = useQueryState("page");

  const [value, setValue] = useState(query ?? "");

  useEffect(() => {
    setValue(query);
  }, [query]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (pathname === "/shop") {
      await Promise.all([setQuery(trimmed), setPage(null)]);

      router.refresh();
    } else {
      router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
    >
      <Search size={18} className="text-slate-600" />
      <input
        name="q"
        className="w-full bg-transparent outline-none placeholder-slate-600"
        type="text"
        placeholder="Search products"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </form>
  );
}
