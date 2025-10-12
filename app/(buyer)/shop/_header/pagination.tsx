"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useShopStore } from "@/zustand/shop-store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

export default function Pagination() {
  const router = useRouter();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { pagination } = useShopStore();

  if (!pagination.totalPage) return null;

  return (
    <div className="flex justify-end items-center gap-3">
      <p className="text-slate-600">
        <span className="text-green-600">{pagination.page}</span>/
        {pagination.totalPage}
      </p>
      <ButtonGroup>
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(page - 1);

            router.refresh();
          }}
          disabled={page <= 1}
        >
          <ChevronLeft className="text-slate-600" />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(page + 1);

            router.refresh();
          }}
          disabled={page >= pagination.totalPage}
        >
          <ChevronRight
            className="text-slate-600"
            onClick={() => setPage(page + 1)}
          />
        </Button>
      </ButtonGroup>
    </div>
  );
}
