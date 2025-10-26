import OrderList from "./order-list";

export default async function OrderPage() {
  return (
    <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
      <section>
        <h1 className="text-xl text-stale-800 font-bold">My Orders</h1>
        <p className="text-slate-600">Showing total 2 orders</p>
      </section>
      <section className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <OrderList />
        </div>
      </section>
    </div>
  );
}
