import { CircleDollarSign, ShoppingBasket, Store, Tags } from "lucide-react";

const DashboardItems = [
  {
    title: "Total Products",
    icon: ShoppingBasket,
    value: 12,
  },
  {
    title: "Total Revenue",
    icon: CircleDollarSign,
    value: 435794,
  },
  {
    title: "Total Orders",
    icon: Tags,
    value: 1139,
  },
  {
    title: "Total Stores",
    icon: Store,
    value: 3,
  },
];

export default async function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Admin <span className="text-slate-800">Dashboard</span>
      </h1>
      <div className="mt-4 flex flex-wrap gap-3">
        {DashboardItems.map((item) => (
          <div
            key={item.title}
            className="inline-flex items-center gap-8 border border-slate-200 rounded-md py-3 px-5"
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
