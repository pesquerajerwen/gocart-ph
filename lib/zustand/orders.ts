import { create } from "zustand";
import { createSelectors } from "./selector";

interface OrdersState {
  selectedOrderId: string | null;
  rateProductDialog: { isOpen: boolean };
  showRateProductDialog: (id: string) => void;
  closeRateProductDialog: () => void;
}

const useOrdersStoreBase = create<OrdersState>((set) => ({
  selectedOrderId: null,
  rateProductDialog: { isOpen: false },
  showRateProductDialog: (id) =>
    set({ rateProductDialog: { isOpen: true }, selectedOrderId: id }),
  closeRateProductDialog: () => set({ rateProductDialog: { isOpen: false } }),
}));

export const useOrdersStore = createSelectors(useOrdersStoreBase);
