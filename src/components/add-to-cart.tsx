"use client";

import { useCart } from "@/store/cart";

export function AddToCart({ productId, title, price }: { productId: string; title: string; price: number }) {
  const add = useCart((s) => s.addItem);

  return (
    <button
      onClick={() => add({ productId, title, price, qty: 1 })}
      className="rounded-xl bg-black text-white px-4 py-2"
    >
      Add to cart
    </button>
  );
}
