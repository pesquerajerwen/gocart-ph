"use client";

import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

export default function NoResult() {
  const router = useRouter();

  const [, setSearch] = useQueryState("search");

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      <Image
        src={assets.document_search}
        alt="No Result"
        height={200}
        width={200}
      />
      <div className="flex flex-col items-center justify-center ">
        <p className="text-slate-500">No products found.</p>
        <p className="text-slate-500">Try searching with different keywords.</p>
      </div>
      <Button
        variant="outline"
        className="text-slate-500"
        onClick={async () => {
          await setSearch(null);

          router.refresh();
        }}
      >
        Clear Search
      </Button>
    </div>
  );
}
