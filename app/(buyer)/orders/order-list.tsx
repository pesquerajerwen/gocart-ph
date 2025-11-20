"use client";

import { InfiniteScrollLoader } from "@/components/infinite-scroll-loader";
import { Separator } from "@/components/ui/separator";
import { useInfiniteOrders } from "@/hooks/use-infinite-orders";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { Fragment } from "react";
import OrderItem from "./order-item";
import OrderItemSkeleton from "./order-item-skeleton";

export default function OrderList() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteOrders();

  const { ref } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 0.25, // triggers when 25% visible
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
      {isLoading && <OrderItemSkeleton />}
      {data?.pages.map((page, index) => {
        const orders = page.data;

        return (
          <Fragment key={index}>
            {orders.map((order, index) => (
              <Fragment key={index}>
                <div className="space-y-6 my-8">
                  {order.items.map((item, index) => (
                    <OrderItem
                      key={index}
                      orderItem={item}
                      review={item.review}
                      address={order.address}
                      dateOrdered={order.createdAt}
                    />
                  ))}
                </div>
                <Separator />
              </Fragment>
            ))}
          </Fragment>
        );
      })}

      <InfiniteScrollLoader isFetchingNextPage={isFetchingNextPage} />

      <div ref={ref} className="h-10" />
    </Fragment>
  );
}
