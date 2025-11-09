"use client";

import { Table } from "@/components/ui/table";
import { StoreOrder } from "@/lib/types/store";
import { useStoreOrdersStore } from "@/lib/zustand/store-orders";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import DataTableBody from "./data-table-body";
import DataTableHeader from "./data-table-header";
import DataTableSkeleton from "./data-table-skeleton";
import DataTableEmpty from "./data-table-empty";

type Props = {
  data: StoreOrder[];
  isLoading?: boolean;
};

export default function DataTable({ data, isLoading }: Props) {
  const hiddenColumns = useStoreOrdersStore.use.hiddenColumns();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        payment: !hiddenColumns.includes("payment"),
        coupon: !hiddenColumns.includes("coupon"),
        status: !hiddenColumns.includes("status"),
        date: !hiddenColumns.includes("date"),
      },
    },
    enableSorting: !isLoading,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-sm">
      <Table className="w-full">
        <DataTableHeader table={table} />
        {isLoading ? (
          <DataTableSkeleton table={table} />
        ) : (
          <DataTableBody table={table} />
        )}
      </Table>
    </div>
  );
}
