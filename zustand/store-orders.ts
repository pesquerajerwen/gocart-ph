import { StoreOrder } from "@/lib/types/order";
import { create } from "zustand";
import { createSelectors } from "./selector";

interface StoreOrdersState {
  orderDetailDialog: { isOpen: boolean };
  selectedOrderId: string | null;
  showOrderDetailDialog: (id: string) => void;
  closeOrderDetailDialog: () => void;
}

const useStoreOrdersStoreBase = create<StoreOrdersState>((set) => ({
  orderDetailDialog: { isOpen: false },
  selectedOrderId: null,
  showOrderDetailDialog: (id) =>
    set({ orderDetailDialog: { isOpen: true }, selectedOrderId: id }),
  closeOrderDetailDialog: () => set({ orderDetailDialog: { isOpen: false } }),
}));

export const useStoreOrdersStore = createSelectors(useStoreOrdersStoreBase);
