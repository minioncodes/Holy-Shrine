"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  status: string;
  amount: number;
  createdAt: string;
  customer?: { name?: string; phone?: string; email?: string };
};

function authHeaders() {
  const token = localStorage.getItem("adminToken") || "";
  return { authorization: `Bearer ${token}` };
}

export default function AdminOrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  async function load() {
    setError("");
    const res = await fetch("/api/admin/orders", { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Failed");
      return;
    }
    setItems(data.orders);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Orders</h1>

      {error && (
        <div className="rounded-2xl border p-4 text-sm text-red-700">
          {error} — try <Link className="underline" href="/admin/login">/admin/login</Link>
        </div>
      )}

      <div className="rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs text-gray-500 border-b">
          <div className="col-span-4">Customer</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Created</div>
          <div className="col-span-1 text-right">View</div>
        </div>

        {items.map((o) => (
          <div key={o._id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b items-center text-sm">
            <div className="col-span-4 truncate">
              <div className="font-medium truncate">{o.customer?.name || "—"}</div>
              <div className="text-xs text-gray-600 truncate">{o.customer?.phone || o.customer?.email || ""}</div>
            </div>
            <div className="col-span-2">{o.status}</div>
            <div className="col-span-2">₹{(o.amount / 100).toFixed(0)}</div>
            <div className="col-span-3 text-xs text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
            <div className="col-span-1 text-right">
              <Link className="underline" href={`/admin/orders/${o._id}`}>Open</Link>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-700">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
