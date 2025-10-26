import CreateAddressDialog from "@/components/address/address-form-dialog";
import MyAddressDialog from "@/components/address/address-list-dialog";
import { getAddresses } from "@/lib/dal/address";
import { getCartItems } from "@/lib/dal/cart";
import { getCurrentUser } from "@/lib/dal/user";
import CartItemList from "./cart-item-list";
import DataHydrator from "./data-hydrator";
import EmptyCart from "./empty-cart";
import PaymentSummary from "./payment-summary";
import RemoveItemDialog from "./remove-item-dialog";

export default async function CartPage() {
  const user = await getCurrentUser();

  const [cartItems, addresses] = await Promise.all([
    user ? await getCartItems({ userId: user.id }) : [],
    user?.id ? await getAddresses({ userId: user.id }) : [],
  ]);

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <DataHydrator cartItems={cartItems}>
      <div className="px-6 max-w-7xl mx-auto my-10 space-y-5">
        <RemoveItemDialog />
        <CreateAddressDialog />
        <MyAddressDialog addresses={addresses} />

        <section>
          <h1 className="text-xl text-stale-800 font-bold">My Cart</h1>
          <p className="text-slate-600">Items in your cart</p>
        </section>

        <section className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <CartItemList />
          </div>
          <div className="w-full sm:w-80">
            <PaymentSummary cartItems={cartItems} />
          </div>
        </section>
      </div>
    </DataHydrator>
  );
}
