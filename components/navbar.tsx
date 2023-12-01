"use client";

import { useAuth } from "@/context/authGoogle";
import { Home, Link, LogOut, MenuIcon, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    path: "/",
    icon: <Home />,
    name: "Home",
  },
  {
    path: "/link",
    icon: <Link />,
    name: "Add link",
  },
  {
    path: "/my-media-space",
    icon: <User2 />,
    name: "Profile",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`block sm:hidden absolute left-0 top-0 ${
          open ? "ml-2" : "ml-6"
        } mt-4 z-30`}
      >
        <MenuIcon />
      </button>
      <nav
        className={`${
          open
            ? "opacity-0 pointer-events-auto left-[-2rem]"
            : "translate-x-[0.03rem] duration-200 pointer-events-auto"
        } min-w-min flex flex-col justify-between text-white gap-6 z-20 items-center py-16 bg-blue-500 h-full absolute sm:fixed left-0`}
      >
        <div>
          {navLinks.map((link) => (
            <div
              key={link.name}
              className={`flex group justify-center items-center cursor-pointer before:w-1 before:left-1 relative py-4 before:absolute duration-200 hover:before:opacity-100 before:h-full before:bg-white before:opacity-0 px-6 ${
                pathname === link.path && "before:opacity-100 bg-blue-600/40"
              }`}
            >
              {link.icon}
              <span className="absolute group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 bg-blue-500 left-[4.5rem] p-1 rounded-md before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none before:bg-blue-500 before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45">
                {link.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={logout}
          className={`flex group justify-center items-center cursor-pointer before:w-1 before:left-1 relative py-4 before:absolute duration-200 hover:before:opacity-100 before:h-full before:bg-white before:opacity-0 px-6 `}
        >
          <LogOut />
          <span className="absolute group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 bg-blue-500 left-[4.5rem] p-1 rounded-md before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none before:bg-blue-500 before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45">
            Logout
          </span>
        </button>
        <p className="text-sm">2023</p>
      </nav>
    </>
  );
}
