
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//this is used by user to reply the question

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { answer } = await req.json();
  const answertext = await prisma.message.update({
    where: { id: Number(params.id) },
    data: { answer, isAnswered: true },
  });

  return NextResponse.json({ success: true, answertext });
}



