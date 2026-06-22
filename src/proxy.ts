import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken, type GetTokenParams } from 'next-auth/jwt';

import { ROUTES } from '@/constants';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === ROUTES.login ||
    pathname === ROUTES.register ||
    pathname.startsWith('/recipes') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/api/image-proxy') ||
    pathname.startsWith('/api/auth');

  if (isPublicRoute) {
    return NextResponse.next();
  }

  let params: GetTokenParams = {
    req: request,
    secret: process.env.NEXTAUTH_SECRET ?? 'secret',
  };

  if (process.env.NODE_ENV === 'production') {
    params = {
      ...params,
      cookieName: '__Secure-authjs.session-token',
    };
  }

  const token = await getToken(params);

  if (!token) {
    const loginUrl = new URL(ROUTES.login, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo).*)'],
};
