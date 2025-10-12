"use client";

import { Table } from "@/components/ui/table";
import { Pagination } from "@/lib/types/global";
import { ProductWithImages } from "@/lib/types/product";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import DataTableBody from "./data-table-body";
import DataTableHeader from "./data-table-header";
import TablePagination from "./pagination";

type Props = {
  products: ProductWithImages[];
  pagination: Pagination;
};

export default function DataTable({ products, pagination }: Props) {
  const table = useReactTable({
    data: products,
    columns,
    defaultColumn: {
      minSize: 10,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-10">
      <div className="border rounded-sm">
        <Table className="w-full table-fixed">
          <DataTableHeader table={table} />
          <DataTableBody table={table} />
        </Table>
      </div>
      <TablePagination pagination={pagination} />
    </div>
  );
}
