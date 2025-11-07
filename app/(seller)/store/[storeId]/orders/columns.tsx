import { Badge } from "@/components/ui/badge";
import { StoreOrder } from "@/lib/types/order";
import { OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { StaticImageData } from "next/image";
import StatusSelect from "./status-select";

export type Order = {
  orderId: string;
  customer: string | StaticImageData;
  total: number;
  payment: string;
  coupon: string;
  status: OrderStatus;
  date: string;
};

export const columns: ColumnDef<StoreOrder>[] = [
  {
    accessorKey: "orderId",
    header: "ORDER ID",
    cell: ({ row }) => <p className="text-green-600">{row.original.id}</p>,
  },
  {
    accessorKey: "product",
    header: "PRODUCT",
    cell: ({ row }) => <p>{row.original.productName}</p>,
  },
  {
    accessorKey: "customer",
    header: "CUSTOMER",
    cell: ({ row }) =>
      row.original.order.user.firstName +
      " " +
      row.original.order.user.lastName,
  },
  {
    accessorKey: "subtotal",
    header: "TOTAL",
    cell: ({ row }) => (
      <p className="text-right">P {Number(row.original.subtotal).toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "payment",
    header: "PAYMENT",
    cell: ({ row }) => (
      <p className="uppercase text-center">
        {row.original.order.payments[0].paymentMethodType}
      </p>
    ),
  },
  {
    accessorKey: "coupon",
    header: "COUPON",
    cell: ({ row }) => {
      if (!row.original.coupon) return <p className="text-center">-</p>;

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
    cell: ({ row }) => (
      <StatusSelect
        orderItemId={row.original.id}
        status={row.original.status}
      />
    ),
  },
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => (
      <p className="text-center">
        {dayjs(row.original.order.createdAt).format("M/D/YYYY, hh:mm A")}
      </p>
    ),
  },
];
