import { notFound } from "next/navigation";
import { getProductBySlug } from "@/server/products";
import { AddToCart } from "@/components/add-to-cart";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border p-6">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="mt-3 text-gray-700">{product.longDesc || product.shortDesc}</p>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-2xl font-semibold">₹{product.price}</div>
          <AddToCart productId={String(product._id)} title={product.title} price={product.price} />
        </div>

        {!!product.specs && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Specs</h2>
            <div className="mt-3 grid gap-2 text-sm">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <div className="w-40 text-gray-500">{k}</div>
                  <div className="flex-1">{Array.isArray(v) ? v.join(", ") : String(v)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
