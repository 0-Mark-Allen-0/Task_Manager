import NextAuth from "next-auth";

// This module augmentation makes TypeScript aware that session.user has an 'id' property
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
