import Link from "next/link";

const steps = [
  {
    title: "Collect & recycle",
    desc: "Discarded temple flowers are safely collected and processed.",
  },
  {
    title: "Craft with care",
    desc: "Handmade incense is prepared with quality-first, low-smoke focus.",
  },
  {
    title: "Create livelihoods",
    desc: "Skill development enables steady work and dignified income.",
  },
];

export function Impact() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">
        <div className="rounded-3xl border bg-white p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">From temple waste to sacred fragrance</h3>
          <p className="mt-3 text-gray-700">
            Most incense brands compete on “strong smell”. We compete on cleaner ritual: smoother fragrance,
            consistent burn, and a purpose that’s bigger than the product.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {steps.map((s, idx) => (
              <div key={s.title} className="rounded-2xl border bg-gray-50 p-4">
                <div className="text-xs text-gray-600">Step {idx + 1}</div>
                <div className="mt-1 font-semibold">{s.title}</div>
                <div className="mt-2 text-sm text-gray-700">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/founder-story" className="rounded-xl bg-black text-white px-5 py-3">
              Read founder story
            </Link>
            <Link href="/why-choose-us" className="rounded-xl border px-5 py-3">
              Why choose us
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-3xl border bg-white p-6 sm:p-8">
          <div className="text-sm text-gray-600">For businesses</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">Corporate gifting, upgraded.</h3>
          <p className="mt-3 text-gray-700">
            Festivals, events, wedding hampers, employee gifting — we help you pick fragrance + packaging and make it
            brand-ready.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>• Custom fragrance suggestions</li>
            <li>• Co-branded packs</li>
            <li>• Bulk pricing</li>
            <li>• Delivery planning</li>
          </ul>

          <Link href="/corporate-gifting" className="mt-6 inline-flex rounded-xl bg-black text-white px-5 py-3">
            Request a quote
          </Link>

          <p className="mt-3 text-xs text-gray-600">
            Pro move: share your budget + quantity, we’ll reply with 2–3 pack options.
          </p>
        </div>
      </div>
    </div>
  );
}
