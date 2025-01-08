import React from "react";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();

  const { pathname } = useRouter();

  return (
    <nav
      className={cn(
        "flex justify-between items-center h-16 px-7 fixed w-full bg-transparent z-10",
        pathname === "/" ? "text-white" : "text-black bg-white"
      )}
    >
      <div className="flex justify-start items-center gap-10">
        <h1 className="font-australia"> Event KU </h1>
        <div className="space-x-8">
          <Link href={"/"}>
            <span
              className={cn(
                pathname === "/" ? "font-semibold text-white border-b-2" : ""
              )}
            >
              Home
            </span>
          </Link>
          <Link href={"/events"}>
            <span
              className={cn(
                pathname.includes("events")
                  ? "font-semibold text-white border-b-2"
                  : "",
                pathname !== "/" ? "text-black border-black" : ""
              )}
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
          {/* <Button onClick={() => signIn()}>Register</Button> */}
        </div>
      )}
    </nav>
  );
}
