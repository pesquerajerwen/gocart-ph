"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/lib/types/global";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

type Props = {
  pagination: Pagination;
};

export default function TablePagination({ pagination }: Props) {
  const router = useRouter();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(5));

  return (
    <div className="flex max-sm:flex-col items-center justify-end mt-6 gap-6">
      <div className="flex items-center">
        <span className="text-sm text-slate-600">Rows per page:</span>
        <Select
          onValueChange={async (value) => {
            await setSize(Number(value));

            router.refresh();
          }}
          value={String(size)}
        >
          <SelectTrigger className="w-18 ml-2">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>

          <SelectContent>
            {[5, 10, 20].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-sm text-slate-600">
          Page {page} of {pagination.totalPage}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(0);

            router.refresh();
          }}
          disabled={page <= 1}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(page - 1);

            router.refresh();
          }}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(page + 1);

            router.refresh();
          }}
          disabled={page >= pagination.totalPage}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await setPage(pagination.totalPage);

            router.refresh();
          }}
          disabled={page >= pagination.totalPage}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
