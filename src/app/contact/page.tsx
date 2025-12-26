"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      alert("Sent! We’ll get back to you.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (e: any) {
      alert(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>

      <div className="rounded-2xl border p-6 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-xl border px-3 py-2" placeholder="Name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Phone"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="rounded-xl border px-3 py-2" placeholder="Message"
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>

        <div className="text-sm text-gray-700">
          WhatsApp order: <a className="underline" href="https://wa.me/919889190902" target="_blank">+91 98891 90902</a>
        </div>
      </div>
    </div>
  );
}
