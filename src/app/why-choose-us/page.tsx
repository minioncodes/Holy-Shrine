const points = [
  "Divine olfactory experience",
  "Purifies your space",
  "Calm, focus & positivity",
  "Customizable fragrances (corporate gifting)",
  "Recycling temple flowers",
  "Empowering rural women",
  "Supporting specially abled children",
  "Quality assurance (natural, low smoke)",
];

export default function WhyChooseUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Why Choose Us</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {points.map((p) => (
          <div key={p} className="rounded-2xl border p-4">{p}</div>
        ))}
      </div>
    </div>
  );
}
