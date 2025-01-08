import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import { Fragment } from "react";
import { MdDashboard, MdEvent} from "react-icons/md";

const LISTMENU = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/admin",
  },
  {
    title: "Events",
    icon: <MdEvent />,
    link: "/admin/agenda",
  },
  // {
  //   title: "Customer",
  //   icon: <MdGroup />,
  //   link: "/admin/customers",
  // },
  // {
  //   title: "Orders",
  //   icon: <MdDashboard />,
  //   link: "/orders",
  // },
  // {
  //   title: "Profile",
  //   icon: <MdSettings />,
  //   link: "/admin/profile",
  // },
];

export default function ListMenuSidebar() {
  const pathname = usePathname();

  return (
    <Fragment>
      {LISTMENU.map((menu, index) => (
        <div
          key={index}
          className={`p-2.5 hover:bg-slate-200 rounded-md my-2 text-gray-500 hover:text-gray-700 ${
            pathname === menu.link && "bg-primary text-white font-semibold"
          } `}
        >
          <Link href={menu.link} className="flex items-center gap-2 ">
            {menu.icon}
            <span>{menu.title}</span>
          </Link>
        </div>
      ))}
    </Fragment>
  );
}
