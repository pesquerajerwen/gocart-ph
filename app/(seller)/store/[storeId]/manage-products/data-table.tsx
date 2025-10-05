"use client";

import { assets } from "@/assets/assets";
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
import { columns, Product } from "./columns";
import Pagination from "./pagination";
import { cn } from "@/lib/utils";

const dummyData: Product[] = [
  {
    name: "Wireless Bluetooth Headphones",
    image: assets.product_img1,
    description:
      "Over-ear wireless headphones with noise cancellation and 30-hour battery life.",
    mrp: 100,
    price: 90,
    actions: true,
  },
  {
    name: "Smart Fitness Tracker",
    image: assets.product_img2,
    description:
      "Water-resistant fitness tracker with heart-rate monitor, sleep tracking, and step counter.",
    mrp: 200,
    price: 180,
    actions: false,
  },
  {
    name: "Portable Bluetooth Speaker",
    image: assets.product_img3,
    description:
      "Compact speaker with deep bass, 12-hour playtime, and hands-free calling.",
    mrp: 300,
    price: 270,
    actions: true,
  },
  {
    name: "4K Ultra HD Action Camera",
    image: assets.product_img4,
    description:
      "Waterproof action camera with 4K recording, wide-angle lens, and Wi-Fi support.",
    mrp: 400,
    price: 360,
    actions: false,
  },
  {
    name: "Ergonomic Office Chair",
    image: assets.product_img5,
    description:
      "Adjustable mesh office chair with lumbar support and 360° swivel wheels.",
    mrp: 500,
    price: 450,
    actions: true,
  },
  {
    name: "Gaming Mechanical Keyboard",
    image: assets.product_img6,
    description:
      "RGB backlit mechanical keyboard with anti-ghosting keys and ergonomic design.",
    mrp: 600,
    price: 540,
    actions: false,
  },
  {
    name: "Smart Home Security Camera",
    image: assets.product_img7,
    description:
      "1080p indoor security camera with motion detection, night vision, and two-way audio.",
    mrp: 700,
    price: 630,
    actions: true,
  },
  {
    name: "Stainless Steel Water Bottle",
    image: assets.product_img8,
    description:
      "Insulated leak-proof water bottle that keeps drinks cold for 24h or hot for 12h.",
    mrp: 800,
    price: 720,
    actions: false,
  },
  {
    name: "Cordless Handheld Vacuum Cleaner",
    image: assets.product_img9,
    description:
      "Lightweight rechargeable vacuum with strong suction and multiple attachments.",
    mrp: 900,
    price: 810,
    actions: true,
  },
  {
    name: "LED Desk Lamp with USB Port",
    image: assets.product_img10,
    description:
      "Adjustable desk lamp with touch controls, dimmable brightness, and USB charging port.",
    mrp: 1000,
    price: 900,
    actions: false,
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
                    [1, 2].includes(index) && "hidden sm:table-cell"
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        "cursor-pointer select-none flex items-center gap-1",
                        index === 4 && "justify-center"
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
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    "text-slate-600",
                    [1, 2].includes(index) && "hidden sm:table-cell"
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
