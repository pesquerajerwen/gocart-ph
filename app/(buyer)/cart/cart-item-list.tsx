import { getCartItems } from "@/lib/dal/cart";
import CartItem from "./cart-item";
import { getCurrentUser } from "@/lib/dal/current-user";

export default async function CartItemList() {
  const user = await getCurrentUser();

  const cartItems = user ? await getCartItems({ userId: user.id }) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-6 items-center">
        <div className="col-span-3">
          <p className="text-slate-600 font-medium">Product</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p className="text-slate-600 font-medium">Quantity</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p className="text-slate-600 font-medium">Total Price</p>
        </div>
        <div className="col-span-1 flex justify-center">
          <p className="text-slate-600 font-medium">Remove</p>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}
