import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link className="rounded-2xl border p-5 hover:shadow-sm" href="/admin/products">
          <div className="font-semibold">Manage products</div>
          <p className="mt-1 text-sm text-gray-700">Create, edit, delete products</p>
        </Link>
        <Link className="rounded-2xl border p-5 hover:shadow-sm" href="/admin/orders">
          <div className="font-semibold">Manage orders</div>
          <p className="mt-1 text-sm text-gray-700">View orders and update status</p>
        </Link>
      </div>
      <p className="text-sm text-gray-600">
        If you see Unauthorized errors, go to <Link className="underline" href="/admin/login">/admin/login</Link> and set your token.
      </p>
    </div>
  );
}
