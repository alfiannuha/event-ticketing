import React from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import classNames from "classnames";

const disableNavbar = ["auth", "admin"];

const disableSidebar = ["", "auth", "events"];
// const disableSidebar = ["/", "/auth/login", "/auth/register", "/events"];

export default function MainLayout(props: { children: React.ReactNode }) {
  // const { pathname } = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={classNames(
        "pb-20",
        { "": disableSidebar.includes(pathname?.split("/")[1]) },
        {
          "bg-slate-200 p-4": !disableSidebar.includes(pathname?.split("/")[1]),
        }
      )}
    >
      {!disableNavbar.includes(pathname?.split("/")[1]) && <Navbar />}
      <div className="flex justify-start gap-3">
        {!disableSidebar.includes(pathname?.split("/")[1]) && (
          <div className="border-r-2">
            <Sidebar />
          </div>
        )}
        <div
          className={classNames(
            "px-10 col-span-9 bg-white flex-1 rounded-lg py-20",

            { "h-[98vh]": !disableSidebar.includes(pathname?.split("/")[1]) },
            { "h-screen": disableSidebar.includes(pathname?.split("/")[1]) }
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
