"use client";

import Google from "next-auth/providers/google";
import { useSession, signIn, signOut } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-row gap-4">
        <p className="font-semibold p-2">Welcome, {session.user?.name}! 🥳</p>
        <button
          onClick={() => signOut()}
          className="bg-black p-2 rounded-xl text-lime-300 hover:scale-110 transition-all delay-75"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-black p-2 rounded-xl text-lime-300 hover:scale-110 transition-all delay-75"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
