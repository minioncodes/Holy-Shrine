import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-700">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Recycled temple flowers • Low-smoke • Long-lasting fragrance
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Incense that feels divine — and does real good.
            </h1>

            <p className="mt-4 text-gray-700 text-base sm:text-lg max-w-2xl">
              Holy Shrine transforms discarded temple flowers into clean, premium incense. Every purchase supports skill
              development and meaningful livelihoods.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-xl bg-black text-white px-5 py-3">
                Shop bestsellers
              </Link>
              <Link href="/categories" className="rounded-xl border px-5 py-3">
                Explore categories
              </Link>
              <Link href="/corporate-gifting" className="rounded-xl border px-5 py-3">
                Corporate gifting
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-sm text-gray-600">Low smoke</div>
                <div className="mt-1 font-semibold">Cleaner burn</div>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-sm text-gray-600">Sustainable</div>
                <div className="mt-1 font-semibold">Flower recycling</div>
              </div>
              <div className="rounded-2xl border bg-white p-4">
                <div className="text-sm text-gray-600">Premium</div>
                <div className="mt-1 font-semibold">Gift-ready packs</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-600">Today’s mood</div>
              <div className="mt-1 text-2xl font-semibold">Calm • Focus • Positivity</div>
              <p className="mt-3 text-gray-700">
                Light one stick, let the room settle, and watch your space turn into a gentle ritual.
              </p>

              <div className="mt-6 rounded-2xl border bg-gray-50 p-4">
                <div className="text-sm font-medium">Quick picks</div>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li className="flex items-center justify-between">
                    <span>Devotional range</span>
                    <span className="text-gray-500">daily puja</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Joy Bubble</span>
                    <span className="text-gray-500">home ambience</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Signature range</span>
                    <span className="text-gray-500">gifting & custom</span>
                  </li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-gray-600">
                Tip: For gifting, share your logo & preferred fragrance — we’ll suggest a tailored pack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
