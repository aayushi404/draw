import { NextAuthOptions, SessionStrategy } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma  from "@repo/db/client"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
 

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ""
const GITHUB_CLIENT_ID= process.env.GITHUB_CLIENT_ID || ""
const GITHUB_CLIENT_SECRET= process.env.GITHUB_CLIENT_SECRET || ""

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  secret: process.env.AUTH_SECRET || "",
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token}) {
      
      if (token) {
        session.user.id = token.sub || "";
      }
      return session;
    },
  },
  
}
export { authOptions };