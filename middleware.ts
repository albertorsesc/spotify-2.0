import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const url = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET
  });

  // ToDo: Redirect Home if already logged in.

  if (url.pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && url.pathname !== '/login') {
    const clonedUrl = url.clone();
    clonedUrl.pathname = '/login';
    return NextResponse.redirect(clonedUrl);
  }
}

export const config = {
  matcher: ['/']
}