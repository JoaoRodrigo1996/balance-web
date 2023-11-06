import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get('nextAuth.token')

  if (request.nextUrl.pathname.startsWith('/dashboard') && !cookies) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard') && cookies) {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }
}
