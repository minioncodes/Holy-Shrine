import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

export const runtime = "nodejs";

const ProductSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  price: z.number().min(0),
  shortDesc: z.string().optional().default(""),
  longDesc: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
  categories: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  specs: z.any().optional().default(null),
});

export async function GET(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  await dbConnect();
  const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => null);
  const parsed = ProductSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });

  await dbConnect();
  const created = await ProductModel.create(parsed.data);
  return NextResponse.json({ product: created });
}
