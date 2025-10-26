"use client";

import { Address } from "@prisma/client";
import { create } from "zustand";
import { createSelectors } from "./selector";

interface UserAddressState {
  addressFormDialog: {
    open: boolean;
  };
  addressListDialog: {
    open: boolean;
  };
  selectedAddress: Address | null;
  openAddressFormDialog: (address?: Address) => void;
  closeAddressFormDialog: () => void;
  openAddressListDialog: () => void;
  closeAddressListDialog: () => void;
}

const useUserAddressStoreBase = create<UserAddressState>((set) => ({
  addressFormDialog: {
    open: false,
  },
  addressListDialog: {
    open: false,
  },
  selectedAddress: null,
  openAddressFormDialog: (address?: Address) =>
    set({
      selectedAddress: address || null,
      addressFormDialog: {
        open: true,
      },
    }),
  closeAddressFormDialog: () =>
    set((state) => ({
      selectedAddress: null,
      addressFormDialog: {
        open: false,
      },
    })),
  openAddressListDialog: () =>
    set({
      addressListDialog: {
        open: true,
      },
    }),
  closeAddressListDialog: () =>
    set((state) => ({
      addressListDialog: {
        open: false,
      },
    })),
}));

export const useUserAddressStore = createSelectors(useUserAddressStoreBase);
