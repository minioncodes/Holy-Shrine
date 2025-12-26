"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, setQty, clear } = useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <button className="text-sm underline" onClick={clear}>Clear</button>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border p-6">
          <p>Your cart is empty.</p>
          <Link className="underline" href="/shop">Continue shopping</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((i) => (
            <div key={i.productId} className="rounded-2xl border p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium truncate">{i.title}</div>
                <div className="text-sm text-gray-700">₹{i.price} each</div>
              </div>

              <div className="flex items-center gap-3">
                <input
                title="remove"
                  className="w-20 rounded-lg border px-2 py-1"
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e) => setQty(i.productId, Math.max(1, Number(e.target.value) || 1))}
                />
                <button className="text-sm underline" onClick={() => removeItem(i.productId)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border p-4 flex items-center justify-between">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">₹{total}</div>
          </div>

          <div className="flex justify-end">
            <Link className="rounded-xl bg-black text-white px-4 py-2" href="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
