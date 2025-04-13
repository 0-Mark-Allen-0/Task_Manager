import { appRouter } from "@/server/api/root";

//To handle the requests using Fetch API -- for use in App Router in Next.js
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

//Define a handler function that can handle GET and POST methods
//It will take a `Request` object (standard WebAPI request) -- This will be called when a client makes a request

// ✅ Use `default` export for the handler function – App Router expects this
export const dynamic = "force-dynamic"; // Optional: ensures SSR compatible

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc", //This is the endpoint the client will use to talk to this API route
    req, //The actual HTTP request
    router: appRouter, //The boss router containing all the procedures
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
