import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AuthShowcase = () => {
  const { data: sessionData, status } = useSession();

  return (
    <div className="hidden items-center justify-end sm:flex md:flex-1 lg:w-0">
      {sessionData ? (
        <>
          <button
            onClick={() => void signOut()}
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign out
          </button>
          <Link
            href="/create"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Create
          </Link>
        </>
      ) : (
        status === "unauthenticated" && (
          <button
            className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        )
      )}
    </div>
  );
};

export default AuthShowcase;
