import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    title: string | null;
    titleSuffix: string | null;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {} & DefaultSession["user"];
  }

  interface User {
    id: string;
    title: string | null;
    role: "ADMIN";
    createdAt: Date;
    updatedAt: Date;
    name: string;
    titleSuffix: string | null;
    email: string;
    password: string;
  }
}
