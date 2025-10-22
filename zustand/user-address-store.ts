"use client";

import { create } from "zustand";

interface UserAddressState {
  createAddressDialog: {
    open: boolean;
  };
  myAddressDialog: {
    open: boolean;
  };
  openCreateAddressDialog: () => void;
  closeCreateAddressDialog: () => void;
  openMyAddressDialog: () => void;
  closeMyAddressDialog: () => void;
}

export const useUserAddressStore = create<UserAddressState>((set) => ({
  createAddressDialog: {
    open: false,
  },
  myAddressDialog: {
    open: false,
  },
  openCreateAddressDialog: () =>
    set({
      createAddressDialog: {
        open: true,
      },
    }),
  closeCreateAddressDialog: () =>
    set((state) => ({
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
