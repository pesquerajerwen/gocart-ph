import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import Image, { StaticImageData } from "next/image";

export type Product = {
  name: string;
  image: string | StaticImageData;
  description: string;
  mrp: number;
  price: number;
  actions: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.image}
          alt={row.original.name}
          className="size-12"
        />
        <span className="text-wrap">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
    cell: ({ row }) => <span>${row.original.mrp.toFixed(2)}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price.toFixed(2)}</span>,
  },
  {
    accessorKey: "actions",
    header: "Actions",

    cell: ({ row }) => (
      <div className="flex justify-center">
        <Switch checked={row.original.actions} />
      </div>
    ),
  },
];
