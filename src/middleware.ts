import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req : any) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 로그인된 사용자가 /login 페이지에 접근하려고 할 때
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 로그인되지 않은 사용자가 보호된 라우트에 접근하려고 할 때
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: ["/login", "/protected/:path*"],
};

