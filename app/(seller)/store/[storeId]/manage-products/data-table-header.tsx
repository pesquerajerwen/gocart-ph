"use client";

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { ProductWithImages } from "@/lib/types/product";
import { cn } from "@/utils/tailwind";
import { flexRender, Table } from "@tanstack/react-table";
import { ArrowUpDown, MoveUp, MoveDown } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";

type Props = {
  table: Table<ProductWithImages>;
};

export default function DataTableHeader({ table }: Props) {
  const [sort, setSort] = useQueryState("sort", { defaultValue: "" });
  const router = useRouter();

  const handleSort = async (columnId: string) => {
    const [currentKey, currentDir] = sort.split(",");

    let newSort = "";

    if (currentKey !== columnId) {
      newSort = `${columnId},asc`;
    } else if (currentDir === "asc") {
      newSort = `${columnId},desc`;
    } else if (currentDir === "desc") {
      newSort = "";
    } else {
      newSort = `${columnId},asc`;
    }

    await setSort(newSort);
    router.refresh();
  };

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const columnId = header.column.id;
            const [sortKey, sortDir] = sort.split(",");
            const isSorted = sortKey === columnId ? sortDir : false;

            const disableSorting =
              header.column.columnDef.enableSorting === false;

            return (
              <TableHead
                key={header.id}
                className={cn(
                  "text-slate-600 px-3 bg-slate-50",
                  [1, 2].includes(index) && "hidden sm:table-cell"
                )}
                style={{ width: header.getSize() + "%" }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    onClick={
                      disableSorting ? undefined : () => handleSort(columnId)
                    }
                    className={cn(
                      "flex items-center gap-1 select-none",
                      disableSorting
                        ? "cursor-default"
                        : "cursor-pointer hover:text-slate-800",
                      index === 4 && "justify-center"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {!disableSorting && (
                      <>
                        {isSorted === false && (
                          <ArrowUpDown className="size-2.5" />
                        )}
                        {isSorted === "asc" && <MoveUp className="size-2.5" />}
                        {isSorted === "desc" && (
                          <MoveDown className="size-2.5" />
                        )}
                      </>
                    )}
                  </div>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
