import React from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center h-16 px-7 border-b-[1px] fixed w-full bg-white">
      <h1> Next.js TailwindCSS Starter </h1>
      {session ? (
        <div className="flex items-center gap-4">
          <div>
            <span>{session?.user?.email}</span>
          </div>
          <Button size={"sm"} onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button variant={"outline"} onClick={() => signIn()}>
            Sign In
          </Button>
          <Button onClick={() => signIn()}>Register</Button>
        </div>
      )}
    </nav>
  );
}
