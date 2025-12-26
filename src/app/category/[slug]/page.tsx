import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, listProductsByCategorySlug } from "@/server/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const products = await listProductsByCategorySlug(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{category.name}</h1>
          {category.description && <p className="mt-2 text-gray-700 max-w-3xl">{category.description}</p>}
        </div>
        <Link href="/shop" className="underline">All products</Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border p-6">No products yet in this category.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p: any) => (
            <Link
              key={p._id}
              href={`/product/${p.slug}`}
              className="rounded-2xl border p-4 hover:shadow-sm transition"
            >
              <div className="text-lg font-medium">{p.title}</div>
              <div className="mt-1 text-sm text-gray-700 line-clamp-2">{p.shortDesc}</div>
              <div className="mt-3 font-semibold">₹{p.price}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
