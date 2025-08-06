import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(context.params);

  const user = await prisma.user.findUnique({
    where: { slug },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const getQuestions = await prisma.message.findMany({
    where: {
      isDisplay: true,
      userId: user.id,
    },
    // select: {
    //   id: true,
    //   question: true,
    // }, this can be done to reduce the payload
  });

  return NextResponse.json({
    status: 201,
    message: getQuestions,
    success: true,
  });
}
