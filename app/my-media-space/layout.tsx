"use client";

import NavBar from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type MediaSpaceLayoutProps = {
  children: ReactNode;
  appearance: ReactNode;
  preview: ReactNode;
  view: ReactNode;
};

export default function MediaSpaceLayout({
  children,
  appearance,
  preview,
  view,
}: MediaSpaceLayoutProps) {
  const query = useSearchParams().get("tab");

  if (query === "view") {
    return (
      <main className="grid sm:grid-cols-mediaSpace grid-cols-1 h-screen justify-items-center">
        <NavBar />

        {view}
      </main>
    );
  }

  return (
    <>
      {/* {isAuthenticate && ( */}
      <section className="grid sm:grid-cols-mediaSpace grid-cols-1 h-screen justify-items-center">
        <NavBar />

        <div className="grid md:grid-cols-2 grid-cols-1 pb-4 w-full divide-y-2 divide divide-gray-300 px-4 xl:px-48">
          {query === "profile" && <div>{children}</div>}
          {query === "appearance" && <div>{appearance}</div>}

          <div>{query !== "view" && preview}</div>
        </div>
      </section>
      {/* )} */}

      {/* {!isAuthenticate && null} */}
    </>
  );
}
