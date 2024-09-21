import { signInUser } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await signInUser({ email });

        console.log("user", user);

        if (user) {
          const passwordConfirm = await compare(password, user.password);

          if (passwordConfirm) {
            return user;
          }

          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account /*profile*/ }: any) {
      console.log("jwt 1", account);

      if (account) {
        if (account?.provider === "credentials") {
          token.email = user.email;
          token.organization_name = user.organization_name;
          token.fullName = user.fullName;
        }
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if ("fullName" in token) {
        session.user.fullName = token.fullName;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("organization_name" in token) {
        session.user.organization_name = token.organization_name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
