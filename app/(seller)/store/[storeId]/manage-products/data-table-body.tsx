import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ClientSideProduct } from "@/lib/types/product";
import { cn } from "@/lib/utils";
import { flexRender, Table } from "@tanstack/react-table";

type Props = {
  table: Table<ClientSideProduct>;
};

export default function DataTableBody({ table }: Props) {
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
