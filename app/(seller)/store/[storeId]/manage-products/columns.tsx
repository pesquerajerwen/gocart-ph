import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductWithImages } from "@/lib/types/product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import StatusSwitch from "./switch";

export const columns: ColumnDef<ProductWithImages>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="relative w-12 h-12 rounded-md">
          <Image
            src={row.original.productImages[0].url}
            alt={row.original.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <span className="text-wrap">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 50,
    cell: ({ row }) => (
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <p className="truncate">{row.original.description}</p>
        </TooltipTrigger>
        <TooltipContent>{row.original.description}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "actualPrice",
    header: "MRP",
    size: 10,
    cell: ({ row }) => <span>${row.original.actualPrice.toFixed(2)}</span>,
  },
  {
    accessorKey: "offerPrice",
    header: "Price",
    size: 10,
    cell: ({ row }) => <span>${row.original.offerPrice.toFixed(2)}</span>,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    size: 10,
    cell: ({ row }) => <StatusSwitch row={row.original} />,
  },
];
