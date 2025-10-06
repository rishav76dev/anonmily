import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyJwt(token);
  if (!decoded) return NextResponse.json({ user: null });

  // Fetch full user from DB
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, email: true, slug: true }, // exclude password
  });

  return NextResponse.json({ user: user || null });
}
