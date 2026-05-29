import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "@/app/lib/validations";
import { prisma } from "@/app/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 24 * 60 * 60, // 1 day expired session
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page, !! to boolean value
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        if (!user.id) {
          return null;
        }

        // user is available during sign-in
        token.id = user.id;
        token.title = user.title;
        token.titleSuffix = user.titleSuffix;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.title = token.title;
      session.user.titleSuffix = token.titleSuffix;

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        // input validation use zod
        const parsedCredentials = LoginFormSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error(parsedCredentials.error.message);
        }

        // destructuring email and password from parsedCredentials.data
        const { email } = parsedCredentials.data;

        // find user by email and password
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (
          user &&
          bcrypt.compareSync(parsedCredentials.data.password, user.password)
        ) {
          console.log("login");
          return user;
        }

        return null;
      },
    }),
  ],
});
