import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.productId === item.productId);
        if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
        else items.push(item);
        set({ items });
      },
      removeItem: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQty: (productId, qty) =>
        set({ items: get().items.map((i) => (i.productId === productId ? { ...i, qty } : i)) }),
      clear: () => set({ items: [] }),
    }),
    { name: "holyshrine-cart-v1" }
  )
);
