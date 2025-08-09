import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password, email } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  let slug: string = "";
  let isUnique = false;

  while (!isUnique) {
    slug =
      username.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Math.random().toString(36).substring(2, 6);

    const existing = await prisma.user.findUnique({ where: { slug } });
    if (!existing) isUnique = true;
  }

  // const existingEmail = await prisma.user.findUnique({ where: { email } });
  // if (existingEmail) {
  //   return NextResponse.json(
  //     { error: "Email already in use" },
  //     { status: 400 }
  //   );
  // }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      slug,
    },
  });
  return NextResponse.json({ user });
}
