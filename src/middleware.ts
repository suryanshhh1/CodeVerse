import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup" || req.nextUrl.pathname === "/forgot-password";
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/admin");

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  if (isAdminRoute && isLoggedIn) {
    const userRole = (req.auth?.user as any)?.role;
    if (userRole !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
