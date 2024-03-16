import { create } from "zustand";

interface CartStore {
  cartItemsCount: number;
  updateCartItemsCount: (count: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItemsCount: 0,
  updateCartItemsCount: (count: number) => {
    set({ cartItemsCount: count });
  },
}));
