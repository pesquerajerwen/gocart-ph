"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

export const data = [
  { date: "2025-01-01", orders: 12 },
  { date: "2025-01-02", orders: 18 },
  { date: "2025-01-03", orders: 9 },
  { date: "2025-01-04", orders: 22 },
  { date: "2025-01-05", orders: 15 },
  { date: "2025-01-06", orders: 30 },
  { date: "2025-01-07", orders: 25 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function OrderChart() {
  return (
    <div className="mt-8">
      <p className="text-slate-500 text-right">
        Orders / <span className="text-slate-800">Day</span>
      </p>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />

          {/* Filled area */}
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
