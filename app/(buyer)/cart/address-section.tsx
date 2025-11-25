"use client";

import { Badge } from "@/components/ui/badge";
import { usePrimaryAddress } from "@/hooks/use-primary-address";
import { useCartStore } from "@/lib/zustand/cart-store";
import { useUserAddressStore } from "@/lib/zustand/user-address-store";
import { Address } from "@/generated/prisma/client";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

export default function AddressSection() {
  const openAddressFormDialog = useUserAddressStore.use.openAddressFormDialog();
  const openAddressListDialog = useUserAddressStore.use.openAddressListDialog();
  const selectAddress = useCartStore.use.selectAddress();
  const selectedAddress = useCartStore.use.selectedAddress();

  const { data: primaryAddress, isLoading } = usePrimaryAddress();

  useEffect(() => {
    primaryAddress && selectAddress(primaryAddress);
  }, [primaryAddress]);

  if (isLoading) {
    return (
      <div>
        <p className="text-slate-400 text-sm">Address</p>
        <div className="bg-slate-200 animate-pulse w-full h-4 rounded mt-2" />
        <div className="bg-slate-200 animate-pulse w-4/5 h-4 rounded mt-2" />
      </div>
    );
  }

  function renderAddress(address: Address) {
    return `${address.address}, ${address.barangay}, ${address.city}, ${address.province}, ${address.region}, ${address.zipcode}`;
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <p className="text-slate-400 text-sm">Address</p>
        {selectedAddress && selectedAddress.isDefault && (
          <Badge
            variant="outline"
            className="text-primary border-primary rounded"
          >
            Default
          </Badge>
        )}
      </div>
      <div className="mt-1 flex items-center">
        {selectedAddress && (
          <p className="text-sm text-slate-500 wrap-break-word line-clamp-2">
            {renderAddress(selectedAddress)}
          </p>
        )}
        {!primaryAddress && (
          <p
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={() => openAddressFormDialog()}
          >
            Add address <PlusIcon className="size-4" />
          </p>
        )}
        {primaryAddress && (
          <p
            className="flex items-center gap-1 text-sm text-green-500  cursor-pointer hover:underline "
            onClick={openAddressListDialog}
          >
            Change
          </p>
        )}
      </div>
    </div>
  );
}
