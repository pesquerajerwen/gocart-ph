import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { StoreOrder } from "@/lib/types/order";
import { cn } from "@/utils/tailwind";
import { useStoreOrdersStore } from "@/zustand/store-orders";
import { flexRender, Table } from "@tanstack/react-table";

type Props = {
  table: Table<StoreOrder>;
};

export default function DataTableBody({ table }: Props) {
  const showOrderDetailDialog = useStoreOrdersStore.use.showOrderDetailDialog();

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
  );
}
