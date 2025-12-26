import Link from "next/link";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border p-8">
        <h1 className="text-3xl font-semibold">Payment successful 🎉</h1>
        <p className="mt-3 text-gray-700">
          Your order has been placed successfully.
        </p>
        {orderId && <p className="mt-2 text-sm text-gray-600">Order ID: <span className="font-mono">{orderId}</span></p>}
        <div className="mt-6 flex gap-3">
          <Link href="/shop" className="rounded-xl bg-black text-white px-4 py-2">Continue shopping</Link>
          <Link href="/contact" className="rounded-xl border px-4 py-2">Need help?</Link>
        </div>
      </div>
    </div>
  );
}
