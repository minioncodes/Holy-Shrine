import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-semibold">Admin</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/admin/products">Products</Link>
            <Link className="hover:underline" href="/admin/orders">Orders</Link>
            <Link className="hover:underline" href="/shop">Store</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
