import { NextResponse } from "next/server";

/**
 * Optional webhook endpoint (stub).
 * When you enable webhooks in Razorpay Dashboard, verify `X-Razorpay-Signature`
 * using the webhook secret and update the order accordingly.
 */
export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json({ ok: true, note: "Webhook stub. Implement verification + event handling." });
}
