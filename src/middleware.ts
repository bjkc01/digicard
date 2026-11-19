export { auth as middleware } from "@/backend/auth/config";

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
