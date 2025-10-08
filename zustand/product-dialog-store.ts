import { create } from "zustand";

interface ProductDialogState {
  isOpen: boolean;
  showDialog: (open: boolean) => void;
}

const useProductDialogStore = create<ProductDialogState>((set) => ({
  isOpen: false,
  showDialog: (open) => set({ isOpen: open }),
}));

export default useProductDialogStore;
