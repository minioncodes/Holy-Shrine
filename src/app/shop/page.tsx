import Link from "next/link";
import { listProducts } from "@/server/products";
import { listCategories } from "@/server/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage() {
  const [products, cats] = await Promise.all([listProducts(), listCategories()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">Shop</h1>
        <Link href="/cart" className="underline">Go to cart</Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map((c: any) => (
          <Link
            key={c._id}
            href={`/category/${c.slug}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p: any) => (
          <Link key={p._id} href={`/product/${p.slug}`} className="rounded-2xl border p-4 hover:shadow-sm transition">
            <div className="text-lg font-medium">{p.title}</div>
            <div className="mt-1 text-sm text-gray-700 line-clamp-2">{p.shortDesc}</div>
            <div className="mt-3 font-semibold">₹{p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
