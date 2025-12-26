import { NextResponse } from "next/server";

export function assertAdmin(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Server missing ADMIN_TOKEN" }, { status: 500 });
  }
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${token}`;
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
