// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/utils';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = getUserFromToken(token);

  // Protect message and answer routes that require authentication
  if (!user && (
    request.nextUrl.pathname.startsWith("/message") ||
    request.nextUrl.pathname.startsWith("/answer")
  )) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/message/:path*", "/answer/:path*"],
};
