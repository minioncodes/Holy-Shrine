import Link from "next/link";
import { listCategories } from "@/server/categories";

export const runtime = "nodejs";

export default async function CategoriesPage() {
  const cats = await listCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Categories</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c: any) => (
          <Link
            key={c._id}
            href={`/category/${c.slug}`}
            className="rounded-2xl border p-5 hover:shadow-sm transition"
          >
            <div className="text-lg font-medium">{c.name}</div>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
