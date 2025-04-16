import { getServerSession } from "next-auth"; //Get the user's session on the server side
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { type Session } from "next-auth";
//This will run on the server and create the tRPC context
//It fetches session based on the incoming request
export async function createContext(): Promise<{ session: Session | null }> {
  const session = (await getServerSession(authOptions)) as Session | null; //Get the session for the current user

  //Returning a context object - to be used in tRPC routers
  return {
    session, //Accessed through `ctx.session`
  };
}

//Define a type called `Context` - infers the type from `createContext`
export type Context = Awaited<ReturnType<typeof createContext>>;
