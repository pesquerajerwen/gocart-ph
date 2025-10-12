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
import { cn } from "@/lib/utils";
import useProductDialogStore from "@/zustand/product-dialog-store";

export const dummyData: Order[] = [
  {
    orderId: "ORD-1001",
    customer: "John Doe",
    total: 120.5,
    payment: "Credit Card",
    coupon: "NEW10",
    status: "pending",
    date: "2025-09-20",
  },
  {
    orderId: "ORD-1002",
    customer: "Jane Smith",
    total: 89.99,
    payment: "PayPal",
    coupon: "SUMMER20",
    status: "pending",
    date: "2025-09-19",
  },
  {
    orderId: "ORD-1003",
    customer: "Alice Johnson",
    total: 200,
    payment: "Bank Transfer",
    coupon: "WELCOME5",
    status: "paid",
    date: "2025-09-18",
  },
  {
    orderId: "ORD-1004",
    customer: "Bob Williams",
    total: 49.5,
    payment: "Credit Card",
    coupon: "DISCOUNT15",
    status: "pending",
    date: "2025-09-17",
  },
  {
    orderId: "ORD-1005",
    customer: "Charlie Brown",
    total: 150.75,
    payment: "Cash on Delivery",
    coupon: "",
    status: "paid",
    date: "2025-09-16",
  },
  {
    orderId: "ORD-1006",
    customer: "Emily Davis",
    total: 75,
    payment: "PayPal",
    coupon: "FALL30",
    status: "pending",
    date: "2025-09-15",
  },
  {
    orderId: "ORD-1007",
    customer: "Frank Miller",
    total: 310.4,
    payment: "Credit Card",
    coupon: "",
    status: "pending",
    date: "2025-09-14",
  },
  {
    orderId: "ORD-1008",
    customer: "Grace Lee",
    total: 20,
    payment: "Cash on Delivery",
    coupon: "NEW10",
    status: "pending",
    date: "2025-09-13",
  },
  {
    orderId: "ORD-1009",
    customer: "Henry Clark",
    total: 450,
    payment: "Bank Transfer",
    coupon: "",
    status: "pending",
    date: "2025-09-12",
  },
  {
    orderId: "ORD-1010",
    customer: "Isabella Martinez",
    total: 99.95,
    payment: "Credit Card",
    coupon: "FLASH50",
    status: "pending",
    date: "2025-09-11",
  },
];

export default function DataTable() {
  const [data] = useState(dummyData);
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

  const { showDialog } = useProductDialogStore();

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
                    [3, 4, 6].includes(index) && "hidden sm:table-cell"
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        "cursor-pointer select-none flex items-center gap-1",
                        index === 2 && "justify-end"
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === false && (
                        <ArrowUpDown className="size-4" />
                      )}
                      {header.column.getIsSorted() === "asc" && (
                        <MoveUp className="size-4" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <MoveDown className="size-4" />
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
              onClick={() => showDialog(true)}
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
