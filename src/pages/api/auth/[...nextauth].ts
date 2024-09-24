import { loginWithGoogle, signInUser } from "@/services/auth/services";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account /*profile*/ }: any) {
      console.log("token", token);

      if (account) {
        if (account?.provider === "credentials") {
          token.email = user.email;
          token.organization_name = user.organization_name;
          token.fullName = user.fullName;
          token.name = user.fullName;
          token.role = user.role;
        }

        if (account?.provider === "google") {
          const data = {
            email: user.email,
            fullName: user.name,
            type: "google",
            role: "admin",
            createdAt: user.createdAt,
            updatedAt: "",
            password: "",
          };

          await loginWithGoogle(data, (data: any) => {
            if (data) {
              token.email = data.email;
              token.organization_name = data.organization_name;
              token.fullName = data.fullName;
              token.name = data.fullName;
              token.role = data.role;

              console.log("google login success");
            } else {
              console.log("google login error");
            }
          });
        }
      }

      return token;
    },
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
