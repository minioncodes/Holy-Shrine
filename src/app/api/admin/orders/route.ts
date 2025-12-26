import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  await dbConnect();
  const orders = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ orders });
}
