"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { Address } from "@prisma/client";
import { Plus } from "lucide-react";
import AddressList from "./address-list";

type Props = {
  addresses: Address[];
};

export default function MyAddressDialog({ addresses }: Props) {
  const { myAddressDialog, openCreateAddressDialog, closeMyAddressDialog } =
    useUserAddressStore();

  return (
    <Dialog
      open={myAddressDialog.open}
      onOpenChange={(open) => !open && closeMyAddressDialog()}
    >
      <DialogContent className="sm:max-w-xl p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>My Address</DialogTitle>
        </DialogHeader>
        <div className="px-4 space-y-4">
          <AddressList addresses={addresses} />
          <Button variant="outline" onClick={openCreateAddressDialog}>
            <Plus /> Add New Address
          </Button>
        </div>
        <DialogFooter className="p-4 border-t">
          <Button variant="outline" onClick={closeMyAddressDialog}>
            Cancel
          </Button>
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
