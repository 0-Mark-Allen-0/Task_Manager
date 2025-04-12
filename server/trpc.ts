//Core tRPC functionality
import { initTRPC } from "@trpc/server";
//For better serialization / deserialization of complex data types
import superjson from "superjson";

//Creating a custom tRPC configuration using superjson
export const t = initTRPC.create({ transformer: superjson });

export const router = t.router;

//A public procedure is an endpoint accessible without authentication
export const publicProcedure = t.procedure;
