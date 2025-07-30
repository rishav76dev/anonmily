import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug , question } = await req.json()

  const user = await prisma.user.findUnique({
    where: { slug },})

    if (!user){
      return NextResponse.json({ error: "User not found"}, { status:404})
    }

  const questiontext = await prisma.message.create({
    data: {
      question,
      userId: user?.id,
    }
  })
 return NextResponse.json({ success: true, message: questiontext })

}

// to post a question we need to pass the which user is question intended for
//question string too
