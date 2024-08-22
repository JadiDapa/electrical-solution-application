import { auth } from "./auth";

export default auth((req) => {
  const session = req.auth;

  if (!session) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/drawing/:path*",
    "/order/:path*",
    "/offer/:path*",
    "/manual-calculation/:path*",
    "/dashboard/:path*",
  ],
};
