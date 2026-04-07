export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/cards/:path*",
    "/create-card/:path*",
    "/settings/:path*",
    "/templates/:path*",
  ],
};
