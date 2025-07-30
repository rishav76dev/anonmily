
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/lib/db";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

  // For now just return user info (replace with JWT or session later)
  return NextResponse.json({ user })
}
