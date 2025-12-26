import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { dbConnect } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

export const runtime = "nodejs";

const VerifySchema = z.object({
  appOrderId: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = VerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });

  const { appOrderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = parsed.data;

  // Verify signature: HMAC_SHA256(order_id|payment_id, secret)
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    await dbConnect();
    await OrderModel.updateOne(
      { _id: appOrderId },
      { $set: { status: "FAILED", "razorpay.paymentId": razorpay_payment_id } }
    );
    return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
  }

  await dbConnect();
  await OrderModel.updateOne(
    { _id: appOrderId },
    { $set: { status: "PAID", "razorpay.paymentId": razorpay_payment_id } }
  );

  return NextResponse.json({ ok: true });
}
