"use client";

import { useState } from "react";

export default function CorporateGiftingPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    quantity: 100,
    budget: "",
    fragrancePreference: "",
    brandingRequired: false,
    notes: "",
  });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      alert("Sent! We'll contact you shortly.");
      setForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        quantity: 100,
        budget: "",
        fragrancePreference: "",
        brandingRequired: false,
        notes: "",
      });
    } catch (e: any) {
      alert(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Corporate Gifting & Customization</h1>
      <p className="text-gray-700">
        Want custom fragrance, co-branded packaging, or bulk gifting packs? Share your requirement — we’ll respond with options.
      </p>

      <div className="rounded-2xl border p-6 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border px-3 py-2" placeholder="Company name"
            value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Contact name"
            value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />

          <input className="rounded-xl border px-3 py-2" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Phone"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <input className="rounded-xl border px-3 py-2" type="number" min={1} placeholder="Quantity"
            value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Budget (optional)"
            value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />

          <input className="rounded-xl border px-3 py-2 sm:col-span-2" placeholder="Fragrance preference (optional)"
            value={form.fragrancePreference} onChange={(e) => setForm({ ...form, fragrancePreference: e.target.value })} />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.brandingRequired}
            onChange={(e) => setForm({ ...form, brandingRequired: e.target.checked })}
          />
          Branding / logo on packaging required
        </label>

        <textarea className="rounded-xl border px-3 py-2 w-full min-h-24" placeholder="Notes / customization details"
          value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </div>
  );
}
