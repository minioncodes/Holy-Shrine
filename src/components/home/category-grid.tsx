import Link from "next/link";

export function CategoryGrid({ categories }: { categories: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c._id}
          href={`/category/${c.slug}`}
          className="group rounded-3xl border bg-white p-6 hover:shadow-sm transition"
        >
          <div className="text-lg font-semibold tracking-tight">{c.name}</div>
          <p className="mt-2 text-sm text-gray-700 line-clamp-3">{c.description}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm underline underline-offset-4">
            Explore <span className="transition group-hover:translate-x-0.5">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
