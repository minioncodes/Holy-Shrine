import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { Section } from "@/components/home/section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Impact } from "@/components/home/impact";
import { listCategories } from "@/server/categories";
import { getFeaturedProducts } from "@/server/products";

export const runtime = "nodejs";

export default async function HomePage() {
  const [categories, products] = await Promise.all([listCategories(), getFeaturedProducts()]);

  return (
    <div className="bg-white">
      <Hero />
      <TrustBar />

      <Section
        eyebrow="Collections"
        title="Pick your vibe"
        description="From devotional daily-use to gift-ready packs — explore categories built around rituals, ambience, and celebrations."
        className="border-t bg-gray-50"
      >
        <CategoryGrid categories={categories} />
        <div className="mt-6">
          <Link href="/shop" className="inline-flex rounded-xl border bg-white px-5 py-3">
            Browse all products
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Bestsellers"
        title="Customer favorites"
        description="These are the packs people reorder for puja routines, home ambience, and gifting."
      >
        <FeaturedProducts products={products} />
      </Section>

      <Section
        eyebrow="Purpose"
        title="Sustainable incense, real-world impact"
        description="A cleaner ritual that also creates livelihoods — that’s the whole point."
        className="border-t bg-gray-50"
      >
        <Impact />
      </Section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="rounded-3xl border bg-black text-white p-8 sm:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs tracking-widest uppercase text-white/70">Ready to order</div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                Bring a divine fragrance home today.
              </h2>
              <p className="mt-3 text-white/80">
                Shop now, or reach out for gifting/customization — we’ll help you pick the right range.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-xl bg-white text-black px-5 py-3">
                Shop now
              </Link>
              <Link href="/corporate-gifting" className="rounded-xl border border-white/30 px-5 py-3">
                Corporate gifting
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/30 px-5 py-3">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-600">
            Tip: Want the homepage to look even more premium? Add product images (we’ll auto-render them in cards).
          </div>
        </div>
      </section>
    </div>
  );
}
