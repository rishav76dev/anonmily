import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { answer, isAnswered, isDisplay } = await req.json();

  const updatedMessage = await prisma.message.update({
    where: { id: Number(id) },
    data: {
      answer,
      isAnswered: isAnswered ?? true,
      isDisplay: isDisplay ?? true,
    },
  });

  return NextResponse.json({ success: true, updatedMessage });
}
