"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Table as ReactTable } from "@tanstack/react-table";
import { cn } from "@/utils/tailwind";

type Props<T> = {
  table: ReactTable<T>;
  rowCount?: number;
};

export default function DataTableSkeleton<T>({
  table,
  rowCount = 5,
}: Props<T>) {
  const visibleColumns = table.getVisibleFlatColumns();

  const rows = Array.from({ length: rowCount });

  return (
    <TableBody>
      {rows.map((_, i) => (
        <TableRow key={i}>
          {visibleColumns.map((col, index) => (
            <TableCell key={col.id} className="h-12">
              <div
                className={cn(
                  index === 3 && "flex justify-end",
                  [4, 5, 6, 7].includes(index) && "flex justify-center"
                )}
              >
                <Skeleton className="h-5 w-[70%]" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
