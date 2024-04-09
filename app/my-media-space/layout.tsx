"use client";

import NavBar from "@/components/navbar";
import { routesApp } from "@/functions/constant";
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
  const tabParams = useSearchParams().get("tab");

  if (tabParams === "view") {
    return (
      <main className="grid sm:grid-cols-mediaSpace grid-cols-1 h-screen justify-items-center">
        <NavBar />

        {view}
      </main>
    );
  }

  return (
    <>
      <section className=" sm:h-screen justify-items-center relative">
        <NavBar />

        {/* <div className="grid md:grid-cols-2 grid-cols-1 pb-4 w-full divide-y-2 divide divide-gray-300 px-4 xl:px-48">
          {tabParams === routesApp.private.tabs.profile && (
            <div>{children}</div>
          )}
          {tabParams === routesApp.private.tabs.appearance && (
            <div>{appearance}</div>
          )}

          <div>{tabParams !== routesApp.private.tabs.view && preview}</div>
        </div> */}

        <div className="grid md:grid-cols-2 grid-cols-1 pb-4 sm:pl-16 w-full px-4 xl:px-48 mt-16 sm:mt-0">
          {tabParams === routesApp.private.tabs.profile &&
            <>
              {children}
            </>
          }
          {tabParams === routesApp.private.tabs.appearance && (
            <>{appearance}</>
          )}

          <div>{tabParams !== routesApp.private.tabs.view && preview}</div>
        </div>
      </section>
    </>
  );
}
