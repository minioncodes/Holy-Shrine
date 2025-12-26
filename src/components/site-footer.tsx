import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-700 grid gap-3 sm:grid-cols-3">
        <div>
          <div className="font-semibold text-gray-900">Holy Shrine Incenses</div>
          <p className="mt-2">
            Crafted from recycled temple flowers. Purpose-driven fragrances.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-900">Policies</div>
          <Link className="block hover:underline" href="/policies/privacy">Privacy</Link>
          <Link className="block hover:underline" href="/policies/returns">Returns</Link>
        </div>

        <div className="space-y-2">
          <div className="font-semibold text-gray-900">Help</div>
          <Link className="block hover:underline" href="/contact">Contact</Link>
          <a className="block hover:underline" href="https://wa.me/919889190902" target="_blank">WhatsApp Orders</a>
        </div>
      </div>
    </footer>
  );
}
