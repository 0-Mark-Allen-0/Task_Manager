//Core tRPC functionality
import { initTRPC } from "@trpc/server";
//For better serialization / deserialization of complex data types
import superjson from "superjson";

import { Context } from "./trpc/context";

//Creating a custom tRPC configuration using superjson
export const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;

//A public procedure is an endpoint accessible without authentication
export const publicProcedure = t.procedure;

//Middleware to check if the user is authenticated

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error("Not authenticated");
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
