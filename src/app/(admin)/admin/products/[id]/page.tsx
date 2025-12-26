"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function headers() {
  const token = localStorage.getItem("adminToken") || "";
  return { authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setId(id);
      const res = await fetch(`/api/admin/products/${id}`, { headers: headers() });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || "Failed to load");
        setLoading(false);
        return;
      }
      const prod = data.product;
      setP({
        title: prod.title || "",
        slug: prod.slug || "",
        price: prod.price || 0,
        shortDesc: prod.shortDesc || "",
        longDesc: prod.longDesc || "",
        categories: (prod.categories || []).join(", "),
        isFeatured: !!prod.isFeatured,
      });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    setSaving(true);
    try {
      const body = {
        ...p,
        categories: p.categories.split(",").map((s: string) => s.trim()).filter(Boolean),
      };
      const res = await fetch(`/api/admin/products/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");
      router.push("/admin/products");
    } catch (e: any) {
      alert(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!p) return <div className="text-sm text-gray-700">Product not found.</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">Edit product</h1>

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
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
