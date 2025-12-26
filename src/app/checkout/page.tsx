"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";

declare global {
  interface Window { Razorpay?: any; }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });

  async function startPayment() {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create order");

      const { order, publicKey, appOrderId } = data;

      const rzp = new window.Razorpay({
        key: publicKey,
        amount: order.amount,
        currency: order.currency,
        name: "Holy Shrine Incenses",
        description: "Incense order",
        order_id: order.id,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        notes: { appOrderId },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appOrderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyData?.error || "Payment verification failed");

          clear();
          router.push(`/order/success?orderId=${encodeURIComponent(appOrderId)}`);
        },
      });

      rzp.open();
    } catch (e: any) {
      alert(e?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Checkout</h1>

      <div className="rounded-2xl border p-6 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border px-3 py-2" placeholder="Full name"
            value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Email"
            value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Phone"
            value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Address line"
            value={customer.addressLine1} onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="City"
            value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="State"
            value={customer.state} onChange={(e) => setCustomer({ ...customer, state: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Pincode"
            value={customer.pincode} onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="font-semibold">Total</div>
          <div className="font-semibold">₹{total}</div>
        </div>

        <button
          onClick={startPayment}
          disabled={loading || items.length === 0 || total <= 0}
          className="w-full rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Starting payment..." : "Pay with Razorpay"}
        </button>

        <p className="text-xs text-gray-600">
          Note: Amount is calculated server-side from product prices in MongoDB to prevent tampering.
        </p>
      </div>
    </div>
  );
}
