import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { StaticImageData } from "next/image";

export type Order = {
  orderId: string;
  customer: string | StaticImageData;
  total: number;
  payment: string;
  coupon: string;
  status: OrderStatus;
  date: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: "ORDER ID",
    cell: ({ row }) => <p className="text-green-600">{row.original.orderId}</p>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "total",
    header: "TOTAL",
    cell: ({ row }) => (
      <p className="font-semibold text-right">
        $ {row.original.total.toFixed(2)}
      </p>
    ),
  },
  {
    accessorKey: "payment",
    header: "PAYMENT",
  },
  {
    accessorKey: "coupon",
    header: "COUPON",
    cell: ({ row }) => {
      if (!row.original.coupon) return "-";
      return (
        <Badge variant="secondary" className="bg-green-100 rounded-sm">
          <span className="text-green-700">{row.original.coupon}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <span className="uppercase">{row.original.status}</span>,
  },
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => (
      <span>{dayjs(row.original.date).format("M/D/YYYY, hh:mm A")}</span>
    ),
  },
];
