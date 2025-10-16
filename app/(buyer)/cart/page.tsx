import CartItemList from "./cart-item-list";
import PaymentSummary from "./payment-summary";

export default function CartPage() {
  return (
    <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
      <section>
        <h1 className="text-xl text-stale-800 font-bold">My Cart</h1>
        <p className="text-slate-600">Items in your cart</p>
      </section>

      <section className="flex gap-3">
        <div className="flex-1">
          <CartItemList />
        </div>
        <div className="min-w-80">
          <PaymentSummary />
        </div>
      </section>
    </div>
  );
}
