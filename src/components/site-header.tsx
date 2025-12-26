"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export function SiteHeader() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold">Holy Shrine</Link>

        <nav className="flex items-center gap-4 text-sm flex-wrap justify-end">
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/categories" className="hover:underline">Categories</Link>
          <Link href="/corporate-gifting" className="hover:underline">Corporate</Link>
          <Link href="/founder-story" className="hover:underline">Founder</Link>
          <Link href="/why-choose-us" className="hover:underline">Why us</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/cart" className="hover:underline">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
