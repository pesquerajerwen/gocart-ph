"use client";

import { Address } from "@prisma/client";
import { create, StoreApi, UseBoundStore } from "zustand";
import { createSelectors } from "./selector";

interface UserAddressState {
  createAddressDialog: {
    open: boolean;
  };
  myAddressDialog: {
    open: boolean;
  };
  selectedAddress: Address | null;
  openCreateAddressDialog: (address?: Address) => void;
  closeCreateAddressDialog: () => void;
  openMyAddressDialog: () => void;
  closeMyAddressDialog: () => void;
}

const useUserAddressStoreBase = create<UserAddressState>((set) => ({
  createAddressDialog: {
    open: false,
  },
  myAddressDialog: {
    open: false,
  },
  selectedAddress: null,
  openCreateAddressDialog: (address?: Address) =>
    set({
      selectedAddress: address || null,
      createAddressDialog: {
        open: true,
      },
    }),
  closeCreateAddressDialog: () =>
    set((state) => ({
      selectedAddress: null,
      createAddressDialog: {
        open: false,
      },
    })),
  openMyAddressDialog: () =>
    set({
      myAddressDialog: {
        open: true,
      },
    }),
  closeMyAddressDialog: () =>
    set((state) => ({
      myAddressDialog: {
        open: false,
      },
    })),
}));

export const useUserAddressStore = createSelectors(useUserAddressStoreBase);
