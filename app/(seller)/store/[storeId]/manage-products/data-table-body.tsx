import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ProductWithImages } from "@/lib/types/product";
import { cn } from "@/utils/tailwind";
import { flexRender, Table } from "@tanstack/react-table";
import DataTableEmpty from "./data-table-empty";

type Props = {
  table: Table<ProductWithImages>;
};

export default function DataTableBody({ table }: Props) {
  if (table.getRowModel().rows.length === 0)
    return <DataTableEmpty table={table} />;

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell, index) => (
            <TableCell
              key={cell.id}
              className={cn(
                "text-slate-600 px-3",
                [1, 2].includes(index) && "hidden sm:table-cell"
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
