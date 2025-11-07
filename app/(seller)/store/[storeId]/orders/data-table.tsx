"use client";

import { Table } from "@/components/ui/table";
import { StoreOrder } from "@/lib/types/order";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import DataTableBody from "./data-table-body";
import DataTableHeader from "./data-table-header";

type Props = {
  data: StoreOrder[];
};

export default function DataTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-10">
      <div className="border rounded-sm">
        <Table className="w-full">
          <DataTableHeader table={table} />
          <DataTableBody table={table} />
        </Table>
      </div>
    </div>
  );
}
