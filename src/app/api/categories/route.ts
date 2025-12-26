import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  const categories = await CategoryModel.find({}).sort({ sortOrder: 1, name: 1 }).lean();
  return NextResponse.json({ categories });
}
