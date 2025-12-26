import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  const products = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ products });
}
