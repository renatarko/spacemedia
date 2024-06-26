"use client";

import { auth } from "@/config/firebase";
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
  const { currentUser } = auth

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value === "/") return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const formatName = (name: string) => {
    const letters = name.split(" ").map((name) => name[0].toUpperCase());
    return letters.join("");
  }

  return (
    <>
      <nav
        className={`min-w-min h-min top-0 left-0 right-0 sm:right-auto flex sm:flex-col justify-between text-white gap-6 z-20 items-center sm:py-16 bg-blue-700 fixed sm:h-full`}
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
              className={`flex group w-full justify-center items-center cursor-pointer relative py-6 sm:py-4 duration-200 px-6 sm:px-4 ${searchParams.get("tab") === link.path &&
                "bg-blue-800 text-blue-500"
                }`}
            >
              {link.icon}
              <span
                className={`absolute hidden sm:flex group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 text-white bg-blue-800 sm:top-4 sm:left-[4rem] py-1 px-2 rounded-md before:hidden before:sm:block before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45 ${searchParams.get("tab") === link.path
                  ? "before:bg-blue-800" : "before:bg-blue-700"
                  }`}
              >
                {link.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex sm:flex-col items-center gap-4">
          <div className="w-9 h-9 overflow-hidden rounded-full border-4 border-blue-300 hidden sm:flex justify-center items-center">
            {user?.avatar ? (
              <Image
                className="w-full"
                width={200}
                height={200}
                src={user?.avatar}
                alt={`Profile image ${user.name}`}
              />
            ) : (
              <span className="text-blue-500">{currentUser?.displayName && formatName(currentUser?.displayName)}</span>
            )
            }
          </div>

          <button
            onClick={logout}
            className={`flex group w-full justify-center items-center cursor-pointer relative py-6 sm:py-4 duration-200 px-6 sm:px-4`}
          >
            <LogOut />
            <span
              className={`absolute hidden sm:flex group-hover:opacity-100 opacity-0 min-w-max group-hover:translate-x-2 duration-150 text-white bg-blue-800 sm:top-4 sm:left-[4rem] py-1 px-2 rounded-md before:hidden before:sm:block before:w-3 before:top-2 before:h-3 before:absolute pointer-events-none before:z-[-1] before:rounded-sm z-10 before:left-[-1.1rem] before:rotate-45 
                before:bg-blue-700`}
            >
              Sign out
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
