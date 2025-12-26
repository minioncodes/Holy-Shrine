import { NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect } from "@/lib/mongodb";
import { CorporateEnquiryModel } from "@/models/CorporateEnquiry";

export const runtime = "nodejs";

const Schema = z.object({
  companyName: z.string().min(2).max(200),
  contactName: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  quantity: z.number().int().min(1),
  budget: z.string().max(1000).optional().or(z.literal("")),
  fragrancePreference: z.string().max(1000).optional().or(z.literal("")),
  brandingRequired: z.boolean().optional().default(false),
  notes: z.string().max(5000).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });
  }

  await dbConnect();
  await CorporateEnquiryModel.create(parsed.data);
  return NextResponse.json({ ok: true });
}
