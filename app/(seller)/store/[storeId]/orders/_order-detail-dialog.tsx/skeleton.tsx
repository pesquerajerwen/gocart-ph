import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useStoreOrdersStore } from "@/lib/zustand/store-orders";

export default function OrderDetailSkeleton() {
  const orderDetailDialog = useStoreOrdersStore.use.orderDetailDialog();
  const closeOrderDetailDialog =
    useStoreOrdersStore.use.closeOrderDetailDialog();

  return (
    <Dialog
      open={orderDetailDialog.isOpen}
      onOpenChange={(open) => !open && closeOrderDetailDialog()}
    >
      <DialogContent className="w-2xl sm:max-w-7xl" showCloseButton={false}>
        <DialogTitle className="text-center">Order Details</DialogTitle>

        <p className="mt-3 text-slate-800 text-sm font-semibold">
          Customer Details
        </p>

        <section className="space-y-1">
          <div className="grid grid-cols-5 gap-3">
            <span className="text-sm text-green-700 col-span-1">Name:</span>
            <Skeleton className="w-48 h-4" />
          </div>

          <div className="grid grid-cols-5 gap-3">
            <span className="text-sm text-green-700 col-span-1">Email:</span>
            <Skeleton className="w-64 h-4" />
          </div>

          <div className="grid grid-cols-5 gap-3">
            <span className="text-sm text-green-700 col-span-1">Phone:</span>
            <Skeleton className="w-40 h-4" />
          </div>

          <div className="grid grid-cols-5 gap-3">
            <span className="text-sm text-green-700 col-span-1">Address:</span>
            <Skeleton className="w-full h-4 col-span-4" />
          </div>
        </section>

        <p className="mt-3 text-slate-800 text-sm font-semibold">Product</p>

        <section className="shadow border border-slate-100 rounded-md p-2">
          <div className="flex gap-1 items-center">
            <Skeleton className="size-16 rounded-md" />
            <div className="flex flex-col gap-1 ml-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </section>

        <section className="mt-3 space-y-1">
          <div className="grid grid-cols-5 gap-3 items-center">
            <span className="text-sm text-green-700 col-span-1">
              Payment Method:
            </span>
            <Skeleton className="h-4 w-32 col-span-4" />
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <span className="text-sm text-green-700 col-span-1">Coupon:</span>
            <Skeleton className="h-4 w-20 col-span-4" />
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <span className="text-sm text-green-700 col-span-1">Status:</span>
            <div className="col-span-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 items-center">
            <span className="text-sm text-green-700 col-span-1">
              Order Date:
            </span>
            <Skeleton className="h-4 w-40 col-span-4" />
          </div>
        </section>

        <section className="flex justify-end mt-4">
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
