import React from "react";
import Navbar from "./Navbar";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import classNames from "classnames";

import { Metadata } from "next";
import HeaderPage from "./Header";
import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "Event Tiket",
  description:
    "The official website of Event Tiket by Alfian An Naufal Nuha and team",
  metadataBase: undefined,
};

const disableNavbar = ["auth", "admin", "order"];

const disableSidebar = ["", "auth", "events", "order"];
// const disableSidebar = ["/", "/auth/login", "/auth/register", "/events"];

export default function MainLayout(props: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  // const pathname = usePathname();

  // console.log(pathname);

  return (
    <>
      <HeaderPage {...metadata} />
      <div
        className={classNames(
          "",
          // "pb-20",
          { "": disableSidebar.includes(pathname?.split("/")[1]) },
          {
            "bg-slate-200 p-4": !disableSidebar.includes(
              pathname?.split("/")[1]
            ),
          }
        )}
      >
        {!disableNavbar.includes(pathname?.split("/")[1]) &&
          pathname?.split("/")[1] !== "scan" && <Navbar />}
        <div className="flex justify-start gap-3">
          {!disableSidebar.includes(pathname?.split("/")[1]) &&
            pathname?.split("/")[1] !== "scan" && (
              <div className="border-r-2">
                <Sidebar />
              </div>
            )}
          <div
            className={classNames(
              "px-10 col-span-9 bg-white flex-1 rounded-lg overflow-auto py-6",
              // after login
              {
                "h-[95vh] pt-10": !disableSidebar.includes(
                  pathname?.split("/")[1]
                ),
              },

              // before login
              {
                "h-screen pt-20": disableSidebar.includes(
                  pathname?.split("/")[1]
                ),
              },

              {
                "h-screen": !disableSidebar.includes("scan"),
              }
            )}
          >
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
