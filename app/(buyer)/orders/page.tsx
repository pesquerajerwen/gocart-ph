import { getOrderCount } from "@/lib/dal/order";
import OrderList from "./order-list";
import { getCurrentUser } from "@/lib/dal/user";
import { redirectToLogin } from "@/utils/redirect";

export default async function OrderPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirectToLogin();

  const orderCount = await getOrderCount({ userId: currentUser.id });

  return (
    <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
      <section>
        <h1 className="text-xl text-stale-800 font-bold">My Orders</h1>
        <p className="text-slate-600">Showing total {orderCount} orders</p>
      </section>
      <section className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <OrderList />
        </div>
      </section>
    </div>
  );
}
