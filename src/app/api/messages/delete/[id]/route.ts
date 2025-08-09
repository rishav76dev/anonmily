import { prisma } from "@/lib/db";
import { getUserFromToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = getUserFromToken(token);

  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.findUnique({
    where: { id: Number(params.id) },
  });

  if (!message || message.userId !== payload.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.message.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true });
}
