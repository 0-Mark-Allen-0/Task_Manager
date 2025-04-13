// import { PrismaClient } from "@prisma/client";

// // TypeScript-specific declaration:
// // This line ensures that we can safely add a custom `prisma` property to the global object.
// // Without this, TypeScript would throw an error saying `global.prisma` does not exist.
// // In development, we store the PrismaClient instance on the global object to avoid creating multiple instances.
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// //Create a new Prisma client instance, if it doesn't already exist, and assign it to 'prisma'
// export const prisma =
//   global.prisma ?? new PrismaClient({ log: ["query", "error"] });

// // During development, Next.js hot reloads the server frequently
// // Without this, every reload would create a new PrismaClient instance, which can crash PostgreSQL
// // So we store the client on the global object only in development

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;

import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
