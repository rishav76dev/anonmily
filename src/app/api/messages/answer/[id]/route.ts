import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//this is used by user to reply the question
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { answer } = await req.json();

  const answertext = await prisma.message.update({
    where: { id: Number(id) },
    data: { answer, isAnswered: true, isDisplay: true },
  });

  return NextResponse.json({ success: true, answertext });
}
