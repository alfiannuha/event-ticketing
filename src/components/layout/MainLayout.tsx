import React from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import classNames from "classnames";

const disableNavbar = ["auth", "admin"];

const disableSidebar = ["/", "/auth/login", "/auth/register"];

export default function MainLayout(props: { children: React.ReactNode }) {
  // const { pathname } = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={classNames(
        { "": disableSidebar.includes(pathname) },
        { "bg-slate-200 p-4": !disableSidebar.includes(pathname) }
      )}
    >
      {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
      <div className="flex justify-start gap-3">
        {!disableSidebar.includes(pathname) && (
          <div className="border-r-2">
            <Sidebar />
          </div>
        )}
        <div
          className={classNames(
            "px-10 col-span-9 bg-white flex-1 rounded-lg p-10",
            { "h-[98vh]": !disableSidebar.includes(pathname) },
            { "h-screen": disableSidebar.includes(pathname) }
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
