/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from 'next/server';

const domain =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL
    : process.env.BASE_URL;
const allowedOrign =
  process.env.NODE_ENV === 'production'
    ? [`${process.env.PRODUCTION_URL}`]
    : [`${process.env.BASE_URL}`];

export function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get('jwt')?.value;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshTokenValue = request.cookies.get('refreshToken')?.value;

  //checking if the request is coming from the same origin
  const origin = request.nextUrl.origin;
  if (origin && !allowedOrign.includes(origin)) {
    return NextResponse.json({
      status: 503,
      statusText: 'Service Unavailable',
      message: 'You are not allowed to access this resource',
    });
  }

  //protecting dashboard routes
  const isProtectedRoute = request.nextUrl
    .toString()
    .split('/')
    .includes('dashboard');
  if (isProtectedRoute) {
    if (refreshTokenValue) {
      const { isAdmin } = JSON.parse(refreshTokenValue ?? '');
      if (isAdmin === false) {
        return NextResponse.redirect(new URL('/login', request.url));
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
