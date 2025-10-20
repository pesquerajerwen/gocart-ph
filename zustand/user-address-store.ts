"use client";

import { create } from "zustand";

interface UserAddressState {
  addressDialog: {
    open: boolean;
  };
  openDialog: () => void;
  closeDialog: () => void;
}

export const useUserAddressStore = create<UserAddressState>((set) => ({
  addressDialog: {
    open: false,
  },
  openDialog: () =>
    set({
      addressDialog: {
        open: true,
      },
    }),
  closeDialog: () =>
    set((state) => ({
      addressDialog: {
        open: false,
      },
    })),
}));
