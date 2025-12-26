import { Icon } from "./icon";

const items = [
  { icon: "leaf", title: "Recycled flowers", desc: "Upcycles temple waste responsibly" },
  { icon: "sparkle", title: "Premium fragrance", desc: "Smooth, long-lasting notes" },
  { icon: "shield", title: "Quality-first", desc: "Clean burn, low smoke focus" },
  { icon: "people", title: "Social impact", desc: "Empowering livelihoods through skills" },
  { icon: "gift", title: "Gift-ready", desc: "Perfect for festivals & weddings" },
  { icon: "truck", title: "Fast dispatch", desc: "Ship-ready inventory system" },
] as const;

export function TrustBar() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border p-4 bg-white">
            <div className="flex items-center gap-2 text-gray-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border bg-gray-50">
                <Icon name={i.icon} />
              </span>
              <div className="font-medium">{i.title}</div>
            </div>
            <div className="mt-2 text-xs text-gray-600">{i.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
