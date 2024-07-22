import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const isLoginPage = url.pathname === '/login';
    console.log(req.cookies.get('next-auth.session-token'),">>>")

    // 로그인 상태를 확인하여 로그인된 사용자가 로그인 페이지에 접근하려고 할 때 리디렉션
    if (isLoginPage && req.cookies.get('next-auth.session-token')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // 토큰이 있으면 true, 없으면 false
      },
    },
  }
);

export const config = {
  matcher: ['/login'], // 로그인 페이지에만 미들웨어 적용
};