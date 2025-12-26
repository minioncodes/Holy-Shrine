import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

export const runtime = "nodejs";

const UpdateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  price: z.number().min(0).optional(),
  shortDesc: z.string().optional(),
  longDesc: z.string().optional(),
  images: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  specs: z.any().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  await dbConnect();
  const product = await ProductModel.findById(params.id).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });

  await dbConnect();
  const updated = await ProductModel.findByIdAndUpdate(params.id, { $set: parsed.data }, { new: true }).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product: updated });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  await dbConnect();
  await ProductModel.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
