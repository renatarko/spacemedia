"use client";

import { useAuth } from "@/context/authGoogle";
import { Home, LogOut, PaintBucket, Smartphone, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const navLinks = [
  {
    path: "/",
    icon: <Home />,
    name: "Home",
  },
  {
    path: "appearance",
    icon: <PaintBucket />,
    name: "Appearance",
  },
  {
    path: "profile",
    icon: <User2 />,
    name: "Profile",
  },
  {
    path: "view",
    icon: <Smartphone />,
    name: "View",
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value === "/") return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const letters =
    user && user?.name.split(" ").forEach((name) => name[0].toUpperCase());

  // ${
  //           open
  //             ? "opacity-0 pointer-events-auto left-[-2rem]"
  //             : "translate-x-[0.03rem] duration-200 pointer-events-auto"
  //         }

  return (
    <>
      {/* <button
        onClick={() => setOpen(!open)}
        className={`block sm:hidden absolute left-0 top-0 ${
          open ? "ml-2" : "ml-6"
        } mt-4 z-30`}
      >
        <MenuIcon />
      </button> */}
      <nav
        className={`w-full h-min top-0 left-0 right-0 flex sm:flex-col justify-between text-white gap-6 z-20 items-center sm:py-16 bg-blue-700 fixed sm:relative sm:h-full`}
      >
        <div className="flex sm:flex-col">
          <Image
            src="/logo.svg"
            alt="Media Space logo"
            width={60}
            height={60}
            className="mb-10 p-1 hidden sm:block"
          />

          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.path === "/") return router.push(link.path);

                router.push(
                  pathname + "?" + createQueryString("tab", link.path)
                );
              }}
              className={`flex group w-full justify-center items-center cursor-pointer relative py-6 sm:py-4 duration-200 px-6 sm:px-4 ${
                searchParams.get("tab") === link.path &&
                "bg-blue-800 text-blue-500"
              }`}
            >
              {link.icon}
              <span
                className={`absolute hidden sm:flex group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 text-white bg-blue-800 sm:top-4 sm:left-[4rem] py-1 px-2 rounded-md before:hidden before:sm:block before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45 ${
                  pathname === link.path
                    ? "before:bg-blue-800"
                    : "before:bg-blue-700"
                }`}
              >
                {link.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex sm:flex-col items-center gap-4">
          <div className="w-9 h-9 overflow-hidden rounded-full border-4 border-white hidden sm:flex justify-center items-center">
            {user?.avatar ? (
              <Image
                className="w-full"
                width={200}
                height={200}
                src={user?.avatar}
                alt={`Profile image ${user.name}`}
              />
            ) : user ? (
              <span className="text-white">{letters!}</span>
            ) : (
              <User2 className="text-gray-400 bg-gray-100 w-full h-full" />
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
