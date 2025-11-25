import { create } from "zustand";
import { createSelectors } from "./selector";
import { OrderItem } from "@/generated/prisma/client";

interface OrdersState {
  selectedOrder: OrderItem | null;
  rateProductDialog: { isOpen: boolean };
  showRateProductDialog: (order: OrderItem) => void;
  closeRateProductDialog: () => void;
}

const useOrdersStoreBase = create<OrdersState>((set) => ({
  selectedOrder: null,
  rateProductDialog: { isOpen: false },
  showRateProductDialog: (order) =>
    set({ rateProductDialog: { isOpen: true }, selectedOrder: order }),
  closeRateProductDialog: () => set({ rateProductDialog: { isOpen: false } }),
}));

export const useOrdersStore = createSelectors(useOrdersStoreBase);
