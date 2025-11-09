"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCartItemAction } from "@/lib/actions/delete-cart-item";
import { useCartStore } from "@/lib/zustand/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RemoveItemDialog() {
  const router = useRouter();

  const { cartItems, removeItemDialog, closeRemoveItemDialog, setCartItems } =
    useCartStore();

  async function handleClick() {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.productId !== removeItemDialog.product!.id
    );

    setCartItems(updatedCartItems);

    closeRemoveItemDialog();

    const { error } = await deleteCartItemAction({
      productId: removeItemDialog.product!.id,
    });

    if (error) {
      toast.error(error.message);
    }

    router.refresh();
  }

  return (
    <Dialog
      open={removeItemDialog.open}
      onOpenChange={(open) => !open && closeRemoveItemDialog()}
    >
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Do you want to remove this item?</DialogTitle>
            <DialogDescription>
              {removeItemDialog.product?.name}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              className="w-24"
              onClick={() => closeRemoveItemDialog()}
            >
              No
            </Button>
            <Button className="w-24" onClick={handleClick}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
