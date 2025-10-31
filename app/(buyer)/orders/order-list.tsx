import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/dal/order";
import { getCurrentUser } from "@/lib/dal/user";
import { Fragment } from "react";
import OrderItem from "./order-item";

export default async function OrderList() {
  const currentUser = await getCurrentUser();

  const orders = await getOrders({
    userId: currentUser!.id,
    sortKey: "createdAt",
    sortOrder: "desc",
  });

  return (
    <Fragment>
      <div className="my-6">
        <div className="grid grid-cols-5 sm:grid-cols-6 items-center">
          <div className="col-span-2">
            <p className="text-slate-600 font-medium max-sm:text-sm">Product</p>
          </div>
          <div className="col-span-1 flex justify-center max-sm:text-sm">
            <p className="text-slate-600 font-medium">Total Price</p>
          </div>
          <div className="col-span-2 flex justify-center max-sm:text-sm">
            <p className="text-slate-600 font-medium">Address</p>
          </div>
          <div className="col-span-1 flex justify-center max-sm:hidden">
            <p className="text-slate-600 font-medium">Status</p>
          </div>
        </div>
      </div>
      {orders.map((order, index) => (
        <Fragment key={index}>
          <div className="space-y-6 my-16">
            {order.items.map((item, index) => (
              <OrderItem
                key={index}
                orderItem={item}
                address={order.address}
                dateOrdered={order.createdAt}
              />
            ))}
          </div>

          {index + 1 < orders.length && <Separator className="" />}
        </Fragment>
      ))}
    </Fragment>
  );
}
