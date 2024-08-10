import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { loginSchema } from "@/components/pages/Auth/Login/LoginForm";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          if (!user) {
            throw new Error("No user found with the given email.");
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password.");
          }

          return user;
        } catch (error) {
          console.error("Authorization Error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});
