import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { getRazorpayClient } from "@/lib/razorpay";
import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { OrderModel } from "@/models/Order";

export const runtime = "nodejs";

const CreateOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      qty: z.number().int().min(1),
    })
  ).min(1),
  customer: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().min(7).max(20),
    addressLine1: z.string().min(3).max(200),
    city: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    pincode: z.string().min(4).max(12),
  }),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CreateOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", issues: parsed.error.issues }, { status: 400 });
  }

  await dbConnect();

  // Compute amount from DB to prevent tampering
  const ids = parsed.data.items.map((i) => i.productId);
  const products = await ProductModel.find({ _id: { $in: ids } }).lean();

  const productMap = new Map(products.map((p: any) => [String(p._id), p]));
  const normalizedItems = parsed.data.items.map((i) => {
    const p: any = productMap.get(i.productId);
    if (!p) throw new Error("Product not found: " + i.productId);
    return { productId: i.productId, title: p.title, price: p.price, qty: i.qty };
  });

  const totalRupees = normalizedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const amountPaise = Math.round(totalRupees * 100);

  // Create app order record first
  const appOrder = await OrderModel.create({
    status: "CREATED",
    currency: "INR",
    amount: amountPaise,
    customer: parsed.data.customer,
    items: normalizedItems,
  });

  const rzp = getRazorpayClient();

  // Razorpay order creation
  const receipt = `app_${appOrder._id}_${crypto.randomBytes(4).toString("hex")}`;

  const order = await rzp.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt,
    notes: { appOrderId: String(appOrder._id) },
  });

  await OrderModel.updateOne({ _id: appOrder._id }, { $set: { "razorpay.orderId": order.id } });

  return NextResponse.json({
    appOrderId: String(appOrder._id),
    order,
    publicKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
