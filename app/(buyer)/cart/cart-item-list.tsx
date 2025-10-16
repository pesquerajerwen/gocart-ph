import CartItem from "./cart-item";

export default async function CartItemList() {
  return (
    <div className="space-y-2">
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
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}
