import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; //Google OAuth for Google signup
import { PrismaAdapter } from "@next-auth/prisma-adapter"; //NextAuth adapter for Prisma
import { prisma } from "@/lib/prisma"; //Import the prisma client

//Define a NextAuth handler
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      //Credentials for Google OAuth
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  //Setting up the session strategy
  session: {
    strategy: "jwt", //Using JSON web tokens
  },

  callbacks: {
    //Runs whenever a session is created or checked
    async session({ session, token }) {
      //Adding the user's unique ID from the JWT token to the session of the object
      if (session.user) {
        session.user.id = token.sub!;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
