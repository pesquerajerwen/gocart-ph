import { getCurrentUser } from "@/lib/dal/user";
import CartItemList from "./cart-item-list";
import PaymentSummary from "./payment-summary";
import { getCartItems } from "@/lib/dal/cart";
import DataHydrator from "./data-hydrator";
import RemoveItemDialog from "./remove-item-dialog";
import AddressDialog from "./_address-dialog";
import EmptyCart from "./empty-cart";

export default async function CartPage() {
  const user = await getCurrentUser();

  const cartItems = user ? await getCartItems({ userId: user.id }) : [];

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <DataHydrator cartItems={cartItems}>
      <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
        <RemoveItemDialog />
        <AddressDialog />

        <section>
          <h1 className="text-xl text-stale-800 font-bold">My Cart</h1>
          <p className="text-slate-600">Items in your cart</p>
        </section>

        <section className="flex gap-3">
          <div className="flex-1">
            <CartItemList />
          </div>
          <div className="min-w-80">
            <PaymentSummary cartItems={cartItems} />
          </div>
        </section>
      </div>
    </DataHydrator>
  );
}
