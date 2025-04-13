"use client";
import { ReactNode } from "react";

//Import React Query core components -- to allow useQuery() and useMutation() to work
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Custom tRPC client, typed with the backend API
import { trpc } from "@/utils/trpc";

import { httpBatchLink } from "@trpc/client";

//Single instance of Query Client
const queryClient = new QueryClient();

import superjson from "superjson";

//A tRPC client with a custom link configuration -- The link handles communication between frontend and tRPC API handler

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "same-origin",
        });
      },
    }),
  ],
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
