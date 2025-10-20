"use client";

import { useUserAddressStore } from "@/zustand/user-address-store";
import { PlusIcon } from "lucide-react";

export default function AddressSection() {
  const { openDialog } = useUserAddressStore();

  return (
    <div>
      <p className="text-slate-400 text-sm">Address</p>
      <p
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
        onClick={() => openDialog()}
      >
        Add address <PlusIcon className="size-4" />
      </p>
    </div>
  );
}
