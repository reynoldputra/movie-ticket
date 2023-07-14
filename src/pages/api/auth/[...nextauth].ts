import NextAuth, { NextAuthOptions } from "next-auth";
const bcrypt = require("bcryptjs");
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "vim" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await prisma.user
          .findFirst({
            where: {
              email: credentials?.email,
            },
          })
          .catch(() => {
            return null;
          });

        if (!user) return null;

        const isValid = bcrypt.compareSync(req.body?.password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          balance : user.balance
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomkey: token.randomkey
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomkey: u.randomkey
        };
      }
      return token;
    },
  },
}

export default NextAuth(authOptions);
