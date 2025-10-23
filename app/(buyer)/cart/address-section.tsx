"use client";

import { Badge } from "@/components/ui/badge";
import { usePrimaryAddress } from "@/hooks/use-primary-address";
import { useUserAddressStore } from "@/zustand/user-address-store";
import { PlusIcon } from "lucide-react";

export default function AddressSection() {
  const openCreateAddressDialog =
    useUserAddressStore.use.openCreateAddressDialog();
  const openMyAddressDialog = useUserAddressStore.use.openMyAddressDialog();

  const { data: primaryAddress, isLoading } = usePrimaryAddress();

  if (isLoading) {
    return (
      <div>
        <p className="text-slate-400 text-sm">Address</p>
        <div className="bg-slate-200 animate-pulse w-full h-4 rounded" />
        <div className="bg-slate-200 animate-pulse w-4/5 h-4 rounded mt-2" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <p className="text-slate-400 text-sm">Address</p>
        <Badge
          variant="outline"
          className="text-primary border-primary rounded"
        >
          Default
        </Badge>
      </div>
      <div className="mt-1 flex items-center">
        {primaryAddress && (
          <p className="text-sm text-slate-500 wrap-break-word line-clamp-2">
            {`${primaryAddress.address}, ${primaryAddress.barangay}, ${primaryAddress.city}, ${primaryAddress.province}, ${primaryAddress.region}, ${primaryAddress.zipcode}`}
          </p>
        )}
        {!primaryAddress && (
          <p
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={() => openCreateAddressDialog()}
          >
            Add address <PlusIcon className="size-4" />
          </p>
        )}
        <p
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 cursor-pointer hover:underline"
          onClick={() => openMyAddressDialog()}
        >
          Change
        </p>
      </div>
    </div>
  );
}
