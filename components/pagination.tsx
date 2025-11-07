"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  page: number;
  totalPage: number;
  rowsPerPage: number;
  onChangeRowsPerPage: (value: string) => void;
  onClickFirst: () => void;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickLast: () => void;
};

export default function TablePagination({
  page,
  totalPage,
  rowsPerPage,
  onChangeRowsPerPage,
  onClickFirst,
  onClickPrevious,
  onClickNext,
  onClickLast,
}: Props) {
  return (
    <div className="flex max-sm:flex-col items-center justify-end mt-6 gap-6">
      <div className="flex items-center">
        <span className="text-sm text-slate-600">Rows per page:</span>
        <Select onValueChange={onChangeRowsPerPage} value={String(rowsPerPage)}>
          <SelectTrigger className="w-18 ml-2">
            <SelectValue placeholder="Select rows per page" />
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
          Page {page} of {totalPage}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClickFirst} disabled={page <= 1}>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          onClick={onClickPrevious}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          onClick={onClickNext}
          disabled={page >= totalPage}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          onClick={onClickLast}
          disabled={page >= totalPage}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
