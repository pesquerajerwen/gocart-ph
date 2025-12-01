import { getStoreDashboard } from "@/lib/dal/store-dashboard";
import { formatCurrency } from "@/lib/helpers";
import { CircleDollarSign, ShoppingBasket, Star, Tags } from "lucide-react";

const DashboardItems = [
  {
    title: "Total Products",
    icon: ShoppingBasket,
  },
  {
    title: "Total Earnings",
    icon: CircleDollarSign,
  },
  {
    title: "Total Orders",
    icon: Tags,
  },
  {
    title: "Total Ratings",
    icon: Star,
  },
];

export default async function Dashboard({ storeId }: { storeId: string }) {
  const { totalEarnings, totalProducts, totalOrders, totalRatings } =
    await getStoreDashboard({
      storeId,
    });

  function renderValue(dashboardItem: string) {
    if (dashboardItem === "Total Earnings") {
      return formatCurrency(
        Number(totalEarnings._sum.subtotal) || 0,
        "PHP",
        "en-PH"
      );
    }
    if (dashboardItem === "Total Products") {
      return totalProducts;
    }
    if (dashboardItem === "Total Orders") {
      return totalOrders;
    }

    if (dashboardItem === "Total Ratings") {
      return totalRatings._sum.totalRating || 0;
    }

    return "";
  }

  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Seller <span className="text-slate-800">Dashboard</span>
      </h1>
      <div className="mt-4 flex flex-wrap gap-3">
        {DashboardItems.map((item) => (
          <div
            key={item.title}
            className="inline-flex items-center gap-8 border border-slate-200 rounded-md py-3 px-5"
          >
            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-500">{item.title}</p>
              <p className="text-2xl text-slate-800">
                {renderValue(item.title)}
              </p>
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
