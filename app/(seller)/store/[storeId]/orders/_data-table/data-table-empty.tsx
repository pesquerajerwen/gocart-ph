import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { StoreOrder } from "@/lib/types/store";
import { cn } from "@/utils/tailwind";
import { Table } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

type Props = {
  table: Table<StoreOrder>;
};

export default function DataTableEmpty({ table }: Props) {
  const [search] = useQueryState("q");
  const [status] = useQueryState("status");
  const [payment] = useQueryState("payment");
  const [product] = useQueryState("product");
  const [from] = useQueryState("from");
  const [to] = useQueryState("to");

  const isFiltering = search || status || payment || product || from || to;

  return (
    <TableBody>
      <TableRow className="cursor-pointer">
        <TableCell
          className={cn("text-slate-600 h-12")}
          colSpan={table.getVisibleLeafColumns().length}
        >
          <p className="text-center my-6">
            {isFiltering ? "No Results." : "No Orders Yet."}
          </p>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
