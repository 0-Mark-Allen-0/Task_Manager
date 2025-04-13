//Setting up the client component of tRPC so it can be used in the front-end
"use client";

//To create a fully typed React client, import a helper function
import { createTRPCReact } from "@trpc/react-query";

//Import the type definition from the tRPC API -- Has all the procedures (getAll, create) -- Passed on to the frontend
import { AppRouter } from "@/server/api/root";

//Initialize the tRPC client -- use `trpc` object for all tRPC API calls
// `trpc.task.getAll.useQuery()`
// `trpc.task.create.useMutation()`
export const trpc = createTRPCReact<AppRouter>();
