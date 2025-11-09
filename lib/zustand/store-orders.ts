import { create } from "zustand";
import { createSelectors } from "./selector";

interface StoreOrdersState {
  hiddenColumns: string[];
  orderDetailDialog: { isOpen: boolean };
  selectedOrderId: string | null;
  showColumn: (column: string) => void;
  hideColumn: (column: string) => void;
  showOrderDetailDialog: (id: string) => void;
  closeOrderDetailDialog: () => void;
}

const useStoreOrdersStoreBase = create<StoreOrdersState>((set) => ({
  hiddenColumns: [],
  orderDetailDialog: { isOpen: false },
  selectedOrderId: null,
  showColumn: (column: string) =>
    set((state) => ({
      hiddenColumns: state.hiddenColumns.filter((i) => column !== i),
    })),
  hideColumn: (column: string) =>
    set((state) => ({ hiddenColumns: [...state.hiddenColumns, column] })),
  showOrderDetailDialog: (id) =>
    set({ orderDetailDialog: { isOpen: true }, selectedOrderId: id }),
  closeOrderDetailDialog: () => set({ orderDetailDialog: { isOpen: false } }),
}));

export const useStoreOrdersStore = createSelectors(useStoreOrdersStoreBase);
