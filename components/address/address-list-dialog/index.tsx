"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { Address } from "@prisma/client";
import { Plus } from "lucide-react";
import AddressList from "./address-list";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/zustand/cart-store";

type Props = {
  addresses: Address[];
};

export default function AddressListDialog({ addresses }: Props) {
  const addressListDialog = useUserAddressStore.use.addressListDialog();

  const openAddressFormDialog = useUserAddressStore.use.openAddressFormDialog();

  const closeAddressListDialog =
    useUserAddressStore.use.closeAddressListDialog();

  const selectAddress = useCartStore.use.selectAddress();
  const selectedAddress = useCartStore.use.selectedAddress();

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => setSelectedId(selectedAddress?.id || ""), [selectedAddress]);

  function handleConfirm() {
    const selected = addresses.find((address) => address.id === selectedId);

    selected && selectAddress(selected);

    closeAddressListDialog();
  }

  return (
    <Dialog
      open={addressListDialog.open}
      onOpenChange={(open) => !open && closeAddressListDialog()}
    >
      <DialogContent className="sm:max-w-xl p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>My Address</DialogTitle>
        </DialogHeader>
        <div className="px-4 space-y-4 max-h-96 overflow-auto">
          <AddressList
            addresses={addresses}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <Button variant="outline" onClick={() => openAddressFormDialog()}>
            <Plus /> Add New Address
          </Button>
        </div>
        <DialogFooter className="p-4 border-t">
          <Button variant="outline" onClick={closeAddressListDialog}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
