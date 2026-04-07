import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      authProvider?: string;
      id?: string;
    };
  }

  interface User {
    authProvider?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authProvider?: string;
    userId?: string;
  }
}
