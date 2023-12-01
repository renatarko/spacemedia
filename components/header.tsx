"use client";

import { useAuth } from "@/context/authGoogle";
import Link from "next/link";

const headerLinks = [{ name: "product", path: "my-media-space" }];

export default function Header() {
  const { signed, user, logout } = useAuth();
  console.log("header - usuario logado?", signed);

  return (
    <header className="flex z-50 justify-between items-center py-8 px-16 bg-white">
      <Link href={"/"} className="font-extrabold text-blue-500 text-lg">
        media space
      </Link>

      <nav className="inline-flex gap-4 items-center">
        {headerLinks.map((link, i) => (
          <Link
            key={i}
            href={`/${link.path}`}
            className="font-medium hover:bg-blue-50 py-2 px-4 rounded-md"
          >
            {link.name}
          </Link>
        ))}

        {signed ? (
          <p className="text-blue-500">{user?.name}</p>
        ) : (
          <Link
            href={"/login"}
            className="ml-10 bg-blue-600 font-medium py-2 px-4 text-white rounded-md"
          >
            Login
          </Link>
        )}

        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
