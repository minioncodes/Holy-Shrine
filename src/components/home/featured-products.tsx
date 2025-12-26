import Link from "next/link";

export function FeaturedProducts({ products }: { products: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link
          key={p._id}
          href={`/product/${p.slug}`}
          className="group rounded-3xl border bg-white p-6 hover:shadow-sm transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold tracking-tight truncate">{p.title}</div>
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">{p.shortDesc}</p>
            </div>
            <div className="shrink-0 rounded-2xl border bg-gray-50 px-3 py-2 text-sm font-semibold">
              ₹{p.price}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Low-smoke burn
            </div>
            <span className="underline underline-offset-4">View</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
