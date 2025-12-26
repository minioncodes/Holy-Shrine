import { NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect } from "@/lib/mongodb";
import { EnquiryModel } from "@/models/Enquiry";

export const runtime = "nodejs";

const EnquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  message: z.string().min(3).max(2000),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data", issues: parsed.error.issues }, { status: 400 });
  }

  await dbConnect();
  await EnquiryModel.create(parsed.data);
  return NextResponse.json({ ok: true });
}
