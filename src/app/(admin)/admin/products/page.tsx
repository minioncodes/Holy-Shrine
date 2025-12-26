"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
};

function authHeaders() {
  const token = localStorage.getItem("adminToken") || "";
  return { authorization: `Bearer ${token}` };
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  async function load() {
    setError("");
    const res = await fetch("/api/admin/products", { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Failed");
      return;
    }
    setItems(data.products);
  }

  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm("Delete product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE", headers: authHeaders() });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Delete failed");
      return;
    }
    await load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link className="rounded-xl bg-black text-white px-4 py-2" href="/admin/products/new">New</Link>
      </div>

      {error && (
        <div className="rounded-2xl border p-4 text-sm text-red-700">
          {error} — try <Link className="underline" href="/admin/login">/admin/login</Link>
        </div>
      )}

      <div className="rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs text-gray-500 border-b">
          <div className="col-span-5">Title</div>
          <div className="col-span-3">Slug</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {items.map((p) => (
          <div key={p._id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center">
            <div className="col-span-5 font-medium truncate">{p.title}</div>
            <div className="col-span-3 text-sm font-mono truncate">{p.slug}</div>
            <div className="col-span-2">₹{p.price}</div>
            <div className="col-span-2 flex justify-end gap-3 text-sm">
              <Link className="underline" href={`/admin/products/${p._id}`}>Edit</Link>
              <button className="underline" onClick={() => del(p._id)}>Delete</button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-700">No products yet.</div>
        )}
      </div>
    </div>
  );
}
