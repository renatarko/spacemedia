"use client";

import { useAuth } from "@/context/authGoogle";
import { routesApp } from "@/functions/constant";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "./button";
import Container from "./container";

export default function Header() {
  const { signed, user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <header className="fixed top-3 w-full z-50">
        <Container>
          <menu className="flex z-50 justify-between items-center border-4 shadow-lg border-blue-600 backdrop-blur-md rounded-full py-3 px-4">
            <Link href={"/"} className="font-extrabold text-blue-300 text-lg">
              <img src="/logo.svg" alt="Logo Space Media" className="w-16" />
            </Link>

            <nav className="sm:inline-flex gap-4 items-center hidden">
              {signed ? (
                <>
                  <Link
                    href={`${routesApp.private.my_media}?tab=${routesApp.private.tabs.profile}`}
                    className="p-2 bg-blue-600 text-blue-100 rounded-full font-semibold"
                  >
                    my space
                  </Link>

                  <button
                    onClick={logout}
                    className="p-2 bg-yellow-500 font-bold hover:text-yellow-900 text-gray-900 rounded-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button isAnchor path={"/sign-up"}>
                    Sign Up
                  </Button>
                  <Link
                    href={"/login"}
                    className="bg-yellow-500 hover:text-yellow-900 flex py-3 px-5 rounded-full text-gray-900 font-bold"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>

            <nav className="flex items-center gap-1 sm:hidden">
              {!signed ? (
                <Link
                  href={"/login"}
                  className="bg-yellow-500 hover:text-yellow-900 flex py-3 px-5 rounded-full text-gray-900 font-bold"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href={`${routesApp.private.my_media}?tab=${routesApp.private.tabs.profile}`}
                    className="p-2 bg-blue-600 text-blue-100 rounded-full font-semibold"
                  >
                    my space
                  </Link>

                  <button
                    className="p-2 bg-yellow-500 hover:text-yellow-900 text-gray-900 rounded-full"
                    onClick={logout}
                  >
                    <LogOut />
                  </button>
                </>
              )}

              {/* <button
                onClick={() => setDropdown(!dropdown)}
                className="p-2 rounded-full bg-blue-800 text-blue-300"
              >
                <Menu />
              </button> */}
            </nav>
          </menu>
        </Container>
      </header>

      <div
        className={`${
          dropdown
            ? "translate-y-12 opacity-100"
            : "translate-y-6 opacity-0 pointer-events-none"
        } bg-blue-600 duration-150 text-white font-semibold p-4 absolute right-0 m-6 z-50 flex flex-col rounded-lg divide-y-2 divide-blue-200 gap-2`}
      >
        <Link href={"/signup"}>Create my media space</Link>
        <Link href={"/login"}>Login</Link>
      </div>
    </>
  );
}
