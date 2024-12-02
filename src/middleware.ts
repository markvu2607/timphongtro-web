import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const authRoutes = ["/auth/sign-in", "/auth/sign-up"]
const privateRoutes = ["/dashboard"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("accessToken")

  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
  }

  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/sign-in", "/auth/sign-up", "/dashboard/:path*"],
}
