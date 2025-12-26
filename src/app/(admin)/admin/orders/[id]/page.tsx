"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function headers() {
  const token = localStorage.getItem("adminToken") || "";
  return { authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export default function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("CREATED");

  async function load(orderId: string) {
    const res = await fetch(`/api/admin/orders/${orderId}`, { headers: headers() });
    const data = await res.json();
    if (!res.ok) {
      alert(data?.error || "Failed to load");
      setLoading(false);
      return;
    }
    setOrder(data.order);
    setStatus(data.order.status);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setId(id);
      await load(id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveStatus() {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data?.error || "Update failed");
      return;
    }
    setOrder(data.order);
    alert("Updated");
  }

  if (loading) return <div>Loading...</div>;
  if (!order) return <div className="text-sm text-gray-700">Order not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Order</h1>
        <Link className="underline" href="/admin/orders">Back</Link>
      </div>

      <div className="rounded-2xl border p-6 space-y-4">
        <div className="text-sm">
          <div className="text-gray-500">Order ID</div>
          <div className="font-mono break-all">{order._id}</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="text-sm">
            <div className="text-gray-500">Customer</div>
            <div className="font-medium">{order.customer?.name || "—"}</div>
            <div className="text-gray-700">{order.customer?.phone || ""}</div>
            <div className="text-gray-700">{order.customer?.email || ""}</div>
          </div>

          <div className="text-sm">
            <div className="text-gray-500">Amount</div>
            <div className="font-semibold">₹{(order.amount / 100).toFixed(0)}</div>

            <div className="mt-3 flex items-center gap-3">
              <select className="rounded-xl border px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="CREATED">CREATED</option>
                <option value="PAID">PAID</option>
                <option value="FAILED">FAILED</option>
              </select>
              <button className="rounded-xl bg-black text-white px-4 py-2" onClick={saveStatus}>Save</button>
            </div>
          </div>
        </div>

        <div>
          <div className="font-semibold">Items</div>
          <div className="mt-2 space-y-2">
            {(order.items || []).map((i: any, idx: number) => (
              <div key={idx} className="rounded-xl border p-3 text-sm flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-medium truncate">{i.title}</div>
                  <div className="text-xs text-gray-600">Qty: {i.qty}</div>
                </div>
                <div className="font-semibold">₹{i.price}</div>
              </div>
            ))}
          </div>
        </div>

        {order.customer?.addressLine1 && (
          <div className="text-sm">
            <div className="font-semibold">Shipping</div>
            <div className="text-gray-700">{order.customer.addressLine1}</div>
            <div className="text-gray-700">{order.customer.city}, {order.customer.state} {order.customer.pincode}</div>
          </div>
        )}
      </div>
    </div>
  );
}
