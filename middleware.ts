// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/utils'; // You already have this

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const user = getUserFromToken(token);


  if (!user && request.nextUrl.pathname.startsWith("/answer")) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/answer/:path*"],
};
