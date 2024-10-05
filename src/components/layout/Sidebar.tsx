import React from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import ListMenuSidebar from "./ListMenuSidebar";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="px-4 w-64 rounded-lg shadow-xl bg-white">
      <div className="h-[96vh] relative">
        <div className="flex flex-col items-center justify-center mb-8">
          {/* <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
            <img
              src="/assets/images/avatar.png"
              alt="avatar"
              className="w-10 h-10"
            />
          </div> */}
          <h3 className="mt-2 text-lg font-semibold">{session?.user?.name}</h3>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>
        {/* MENU  */}
        <ListMenuSidebar />
        {/* {listMenu.map((menu, index) => (
          <div key={index} className="p-2 hover:bg-slate-200 rounded-md my-2">
            <Link
              href={menu.link}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <span className="text-lg">{menu.icon}</span>
              <span>{menu.title}</span>
            </Link>
          </div>
        ))} */}

        {/* Button Logout in bottom */}
        <div className="absolute bottom-5 w-full">
          <Button
            onClick={() => signOut()}
            className="mt-5 w-full py-2 text-sm text-white rounded-md "
          >
            Logout
          </Button>

          {/* FOOTER  */}
          <footer className="mt-5">
            <p className="text-sm text-gray-500 text-center">
              © 2021 All Rights Reserved
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
