import { Badge } from "@/components/ui/badge";
import { StoreOrder } from "@/lib/types/store";
import { OrderStatus } from "@/generated/prisma/client";
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
    header: "Order ID",
    cell: ({ row }) => <p className="text-green-600 px-2">{row.original.id}</p>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <p>{row.original.productName}</p>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => row.original.order.address.fullName,
  },
  {
    accessorKey: "quantity",
    header: "QTY",
    cell: ({ row }) => (
      <p className="uppercase text-center">{row.original.quantity}</p>
    ),
  },
  {
    accessorKey: "subtotal",
    header: "Total",
    cell: ({ row }) => (
      <p className="text-right">
        P {(Number(row.original.subtotal) * row.original.quantity).toFixed(2)}
      </p>
    ),
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => (
      <p className="uppercase text-center">
        {row.original.order.payments[0].paymentMethodType}
      </p>
    ),
  },
  {
    accessorKey: "coupon",
    header: "Coupon",
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
    header: "Status",
    cell: ({ row }) => (
      <StatusSelect
        orderItemId={row.original.id}
        status={row.original.status}
      />
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-center">
        {dayjs(row.original.order.createdAt).format("M/D/YYYY, hh:mm A")}
      </p>
    ),
  },
];
