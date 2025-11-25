"use client";

import { Badge } from "@/components/ui/badge";
import { OrderItemStatus } from "@/generated/prisma/client";
import clsx from "clsx";
import {
  CheckCircle2,
  Clock,
  Dot,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";

type Props = {
  variant: OrderItemStatus;
};

export default function OrderStatus({ variant }: Props) {
  const statusConfig = {
    pending: {
      icon: <Clock className="size-4" />,
      label: "Pending",
      className: "bg-gray-100 text-gray-700 border border-gray-300",
    },
    processing: {
      icon: <RefreshCw className="size-4" />,
      label: "Processing",
      className: "bg-amber-100 text-amber-800 border border-amber-300",
    },
    shipped: {
      icon: <Truck className="size-4" />,
      label: "Shipped",
      className: "bg-blue-100 text-blue-800 border border-blue-300",
    },
    delivered: {
      icon: <CheckCircle2 className="size-4" />,
      label: "Delivered",
      className: "bg-green-100 text-green-800 border border-green-300",
    },
    cancelled: {
      icon: <XCircle className="size-4" />,
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border border-red-300",
    },
  };

  const config = statusConfig[variant] ?? {
    icon: <Dot className="size-4" />,
    label: "Unknown",
    className: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  return (
    <Badge
      variant="secondary"
      className={clsx(
        "rounded-full w-fit px-3 py-1.5 flex items-center gap-2 font-medium transition-all duration-200",
        config.className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
}
