import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role || "STUDENT";
      }
      return token;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("LOGIN ATTEMPT - Email:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.error("LOGIN FAILED: Missing credentials");
          return null;
        }
        
        try {
          // Use findFirst with insensitive mode to avoid case-sensitivity bugs
          const user = await prisma.user.findFirst({
            where: { 
              email: {
                equals: credentials.email as string,
                mode: 'insensitive'
              }
            }
          });
          
          if (!user) {
            console.error("LOGIN FAILED: User not found for email:", credentials.email);
            return null;
          }
          
          if (!user.passwordHash) {
            console.error("LOGIN FAILED: User has no password hash (perhaps signed up with OAuth)");
            return null;
          }
          
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );
          
          if (!isPasswordValid) {
            console.error("LOGIN FAILED: Password mismatch for email:", credentials.email);
            return null;
          }
          
          console.log("LOGIN SUCCESS: User authenticated successfully:", user.email);
          
          // Return a clean, plain object without Date objects to prevent NextAuth serialization errors
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("LOGIN FAILED: Unexpected error in authorize:", error);
          return null;
        }
      }
    })
  ]
});
