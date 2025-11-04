"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useOrderDetails } from "@/hooks/use-order-details";
import { useStoreOrdersStore } from "@/zustand/store-orders";
import DialogBody from "./dialog-body";
import OrderDetailSkeleton from "./skeleton";

export default function OrderDetailDialog() {
  const orderDetailDialog = useStoreOrdersStore.use.orderDetailDialog();
  const selectedOrderId = useStoreOrdersStore.use.selectedOrderId();
  const closeOrderDetailDialog =
    useStoreOrdersStore.use.closeOrderDetailDialog();

  const { data: storeOrderDetail, isLoading } = useOrderDetails(
    selectedOrderId!
  );

  return (
    <Dialog
      open={orderDetailDialog.isOpen}
      onOpenChange={(open) => !open && closeOrderDetailDialog()}
    >
      <DialogContent className="w-2xl sm:max-w-7xl" showCloseButton={false}>
        <DialogTitle className="text-center">Order Details</DialogTitle>
        {isLoading || !storeOrderDetail ? (
          <OrderDetailSkeleton />
        ) : (
          <DialogBody storeOrderDetail={storeOrderDetail} />
        )}

        <section className="flex justify-end">
          <Button
            variant="secondary"
            onClick={closeOrderDetailDialog}
            className="w-28"
          >
            Close
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
