import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

async function middleware(req: NextRequestWithAuth) {
  const notAdmin = req.nextauth.token?.role !== "teacher"
  const isLogin = req.nextauth.token ? true : false

  const dashboardRoutes =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/dashboard/create-exam") ||
    req.nextUrl.pathname.startsWith("/dashboard/user") ||
    req.nextUrl.pathname.startsWith("/dashboard/user/create")

  // check if user is not admin
  if (dashboardRoutes && (isLogin || !isLogin) && notAdmin) {
    return NextResponse.rewrite(new URL("/denied", req.url))
  }
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/sign-in",
  },
})

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/create-exam",
    "/dashboard/user",
    "/dashboard/user/create",
  ],
}
