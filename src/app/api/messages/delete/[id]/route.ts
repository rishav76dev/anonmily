import { prisma } from "@/lib/db";
import { getServerAuth } from "@/hooks/useServerAuth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { user: authUser } = await getServerAuth();

  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.findUnique({
    where: { id: Number(id) },
  });

  if (!message || message.userId !== authUser.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.message.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
