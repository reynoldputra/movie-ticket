import NextAuth from "next-auth";
const bcrypt = require("bcryptjs");
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export default NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
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
              email: credentials?.email
            }
          })
          .catch(() => {
            return null;
          });

        console.log(user)

        if (!user) return null;

        const isValid = bcrypt.compareSync(req.body?.password, user.password);

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
});
