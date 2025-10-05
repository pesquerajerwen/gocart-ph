import { CircleDollarSign, ShoppingBasket, Star, Tags } from "lucide-react";

const DashboardItems = [
  {
    title: "Total Products",
    value: 7,
    icon: ShoppingBasket,
  },
  {
    title: "Total Earnings",
    value: "$ 12,828",
    icon: CircleDollarSign,
  },
  {
    title: "Total Orders",
    value: 91,
    icon: Tags,
  },
  {
    title: "Total Ratings",
    value: 12,
    icon: Star,
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Seller <span className="text-slate-800">Dashboard</span>
      </h1>
      <div className="mt-4 flex flex-wrap gap-3">
        {DashboardItems.map((item) => (
          <div
            key={item.title}
            className="inline-flex items-center gap-12 border border-slate-200 rounded-md py-3 px-5"
          >
            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-500">{item.title}</p>
              <p className="text-2xl text-slate-800">{item.value}</p>
            </div>
            <div className="size-12 flex items-center justify-center bg-slate-100 rounded-full">
              <item.icon className="size-6 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
