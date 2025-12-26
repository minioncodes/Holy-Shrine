import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

export const runtime = "nodejs";

const PatchSchema = z.object({
  status: z.enum(["CREATED", "PAID", "FAILED"]).optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  await dbConnect();
  const order = await OrderModel.findById(params.id).lean();
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  const body = await req.json().catch(() => null);
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });

  await dbConnect();
  const updated = await OrderModel.findByIdAndUpdate(params.id, { $set: parsed.data }, { new: true }).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order: updated });
}
