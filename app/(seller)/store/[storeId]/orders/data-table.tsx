"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoveDown, MoveUp } from "lucide-react";
import { useState } from "react";
import { columns, Order } from "./columns";
import Pagination from "./pagination";
import { cn } from "@/utils/tailwind";
import { useStoreOrdersStore } from "@/zustand/store-orders";
import { StoreOrder } from "@/lib/types/order";

type Props = {
  data: StoreOrder[];
};

export default function DataTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize] = useState(5);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  const showOrderDetailDialog = useStoreOrdersStore.use.showOrderDetailDialog();

  return (
    <div className="mt-10">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "text-slate-600",
                    [2, 4, 5, 7].includes(index) && "hidden sm:table-cell"
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        "cursor-pointer select-none flex items-center gap-1",
                        index === 3 && "justify-end",
                        [4, 5, 6, 7].includes(index) && "justify-center"
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === false && (
                        <ArrowUpDown className="size-2.5" />
                      )}
                      {header.column.getIsSorted() === "asc" && (
                        <MoveUp className="size-2.5" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <MoveDown className="size-2.5" />
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="cursor-pointer"
              onClick={() => showOrderDetailDialog(row.original.id)}
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "text-slate-600 h-16",
                    [3, 4, 6].includes(index) && "hidden sm:table-cell"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}
