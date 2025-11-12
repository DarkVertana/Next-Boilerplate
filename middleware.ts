import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const { pathname } = new URL(request.url)

  const userCookie = request.cookies.get('user')

  // Protect dashboard for logged-in users only
  if (pathname.startsWith('/dashboard')) {
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect logged-in users away from login/register pages
  if (pathname === '/login' || pathname === '/register') {
    if (userCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
