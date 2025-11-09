import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { StoreOrder } from "@/lib/types/store";
import { useStoreOrdersStore } from "@/lib/zustand/store-orders";
import { cn } from "@/utils/tailwind";
import { flexRender, Table } from "@tanstack/react-table";
import DataTableEmpty from "./data-table-empty";

type Props = {
  table: Table<StoreOrder>;
};

export default function DataTableBody({ table }: Props) {
  const showOrderDetailDialog = useStoreOrdersStore.use.showOrderDetailDialog();

  if (table.getRowModel().rows.length === 0)
    return <DataTableEmpty table={table} />;

  return (
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
                "text-slate-600 h-12",
                [3, 4, 6].includes(index) && "hidden sm:table-cell"
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
