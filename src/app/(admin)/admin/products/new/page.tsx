"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function headers() {
  const token = localStorage.getItem("adminToken") || "";
  return { authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [p, setP] = useState({
    title: "",
    slug: "",
    price: 0,
    shortDesc: "",
    longDesc: "",
    categories: "devotional-range",
    isFeatured: false,
  });

  async function save() {
    setSaving(true);
    try {
      const body = {
        ...p,
        categories: p.categories.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const res = await fetch("/api/admin/products", { method: "POST", headers: headers(), body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      router.push("/admin/products");
    } catch (e: any) {
      alert(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">New product</h1>

      <div className="rounded-2xl border p-6 space-y-3">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="Title"
          value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />

        <input className="w-full rounded-xl border px-3 py-2 font-mono" placeholder="Slug (unique)"
          value={p.slug} onChange={(e) => setP({ ...p, slug: e.target.value })} />

        <input className="w-full rounded-xl border px-3 py-2" type="number" min={0} placeholder="Price (₹)"
          value={p.price} onChange={(e) => setP({ ...p, price: Number(e.target.value) })} />

        <input className="w-full rounded-xl border px-3 py-2" placeholder="Categories (comma-separated slugs)"
          value={p.categories} onChange={(e) => setP({ ...p, categories: e.target.value })} />

        <textarea className="w-full rounded-xl border px-3 py-2 min-h-20" placeholder="Short description"
          value={p.shortDesc} onChange={(e) => setP({ ...p, shortDesc: e.target.value })} />

        <textarea className="w-full rounded-xl border px-3 py-2 min-h-28" placeholder="Long description"
          value={p.longDesc} onChange={(e) => setP({ ...p, longDesc: e.target.value })} />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={p.isFeatured} onChange={(e) => setP({ ...p, isFeatured: e.target.checked })} />
          Featured
        </label>

        <button className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Create"}
        </button>
      </div>
    </div>
  );
}
