"use client";

import { useAuth } from "@/context/authGoogle";
import {
  Home,
  Link as LinkIcon,
  LogOut,
  MenuIcon,
  Smartphone,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    path: "/",
    icon: <Home />,
    name: "Home",
  },
  {
    path: "/my-media-space/add-links",
    icon: <LinkIcon />,
    name: "Add link",
  },
  {
    path: "/my-media-space",
    icon: <User2 />,
    name: "Profile",
  },
  {
    path: "/media-space/renata_rko",
    icon: <Smartphone />,
    name: "View",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

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
        } w-full flex flex-col justify-between text-white gap-6 z-20 items-center py-16 bg-blue-700 h-full`}
      >
        <div>
          {navLinks.map((link) => (
            <Link
              href={link.path}
              key={link.name}
              className={`flex group w-full justify-center items-center cursor-pointer relative py-4 duration-200 px-4 ${
                pathname === link.path && "bg-blue-800 text-blue-500"
              }`}
            >
              {link.icon}
              <span
                className={`absolute group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 text-white bg-blue-800 left-[4rem] py-1 px-2 rounded-md before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none  before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45 ${
                  pathname === link.path
                    ? "before:bg-blue-800"
                    : "before:bg-blue-700"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <Link href="/renata-developer">Link</Link>

        <div className="flex flex-col items-center gap-4">
          <div className="w-9 h-9 overflow-hidden rounded-full border-4 border-white">
            {user?.avatar ? (
              <Image
                className="w-full"
                width={200}
                height={200}
                src={user?.avatar}
                alt={`Profile image ${user.name}`}
              />
            ) : (
              <p className="w-full">RK</p>
            )}
          </div>

          <button
            onClick={logout}
            className={`flex group justify-center items-center cursor-pointer before:w-1 before:left-1 relative py-4 before:absolute duration-200 hover:before:opacity-100 before:h-full before:bg-white before:opacity-0 px-6 `}
          >
            <LogOut />
            <span
              className={`absolute group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 text-white bg-blue-800 left-[4rem] py-1 px-2 rounded-md before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none  before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45 before:bg-blue-700`}
            >
              Sign out
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
