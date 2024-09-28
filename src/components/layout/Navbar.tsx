import React from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();

  const { pathname } = useRouter();

  return (
    <nav className="flex justify-between items-center h-16 px-7 border-b-[1px] fixed w-full bg-white">
      <div className="flex justify-start items-center gap-10">
        <h1> Next.js TailwindCSS Starter </h1>
        <div className="space-x-8">
          <Link href={"/"}>
            <span
              className={pathname === "/" ? "font-semibold text-primary" : ""}
            >
              Home
            </span>
          </Link>
          <Link href={"/events"}>
            <span
              className={
                pathname.includes("events") ? "font-semibold text-primary" : ""
              }
            >
              Events
            </span>
          </Link>
        </div>
      </div>
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
