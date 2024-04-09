"use client";

import { usePreview } from "@/context/preview";
import { User } from "@/types/types";
import { DocumentData } from "@firebase/firestore";
import { Lightbulb, User2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "./link";

type PhonePreviewProps = {
  data: DocumentData | undefined;
};

export default function PhonePreview({ data }: PhonePreviewProps) {
  const { links, colors, userPreview, setUserPreview, setColors, setLinks } =
    usePreview();
  const [hasLinkName, setHasLinkName] = useState(null);

  const gradient = `linear-gradient(to ${colors?.background?.direction}, ${colors?.background?.gradient?.firstColor}, ${colors?.background?.gradient?.secondColor})`;

  const pathname = usePathname();

  const searchParams = useSearchParams();
  const isTabView = searchParams.has("view");
  const isDynamicRoute = pathname + data?.linkName;

  useEffect(() => {
    const updatedState: Pick<
      User,
      "title" | "career" | "nickname" | "link" | "avatar" | "background"
    > = {
      background: data?.background,
      title: data?.title,
      career: data?.career,
      nickname: data?.nickname,
      link: data?.link,
      avatar: data?.avatar,
    };
    setUserPreview(updatedState);
    setColors(updatedState);
    setLinks(data?.link?.links);
    setHasLinkName(data?.linkName);
  }, [data]);

  return (
    <>
      <div
        className={`px-4 sm:px-6 sm:mt-16 md:mt-20 overflow-x-hidden relative pb-16 overflow-y-auto md:w-[80%] sm:w-[90%] w-full flex flex-col items-center rounded-2xl border-gray-700 ${isTabView || isDynamicRoute ? "shadow-none " : "shadow-2xl "
          } ${isTabView || (isDynamicRoute && "mt-6 md:w-[60%] lg:max-w-[30rem]")
          }`}
      >
        <div
          className={`absolute top-0 bottom-0 left-0 bg-transparent right-0 z-[-1]`}
          style={{
            background: colors
              ? colors?.background?.type === "gradient"
                ? gradient
                : colors?.background?.color
              : "#97CEDB",
          }}
        />

        {userPreview.avatar ? (
          <div className="w-24 relative h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg overflow-hidden">
            <img
              src={userPreview?.avatar}
              alt={``}
              className="w-full h-full object-cover z-0"
            />

            <div className="absolute bg-gray-200 w-full h-full animate-pulse z-20" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full border-4 overflow-hidden bg-gray-100 border-white mt-8 z-10 shadow-lg flex justify-center items-center">
            <User2 size={60} className="text-gray-400 bg-gray-100" />
          </div>
        )}

        <div className="flex flex-col items-center z-10 mt-8">
          <h1
            style={{
              color: colors?.title?.color! || "black",
              fontSize: colors?.title?.size!
                ? colors?.title?.size + "px"
                : "1.5rem",
              fontWeight: `${colors?.title?.weight ? colors?.title?.weight : "bold"
                }`,
            }}
          >
            {userPreview?.title?.content
              ? userPreview?.title?.content
              : "Your title"}
          </h1>
          <h2
            style={{
              color: colors?.career?.color || "black",
              fontSize: colors?.career?.size
                ? colors?.career?.size + "px"
                : "1.25rem",
              fontWeight: `${colors?.career?.weight ? colors?.career?.weight : "normal"
                }`,
            }}
          >
            {userPreview?.career?.content
              ? userPreview?.career?.content
              : "Your career"}
          </h2>

          <p
            className="mt-4 text-base font-bold text-gray-500"
            style={{
              color: colors?.nickname?.color || "gray",
              fontSize: `${colors?.nickname?.size
                ? colors?.nickname?.size + "px"
                : userPreview?.nickname?.size! + "px"
                }`,
              fontWeight: `${colors?.nickname?.weight ? colors?.nickname?.weight : "normal"
                }`,
            }}
          >
            @
            {userPreview?.nickname?.content
              ? userPreview?.nickname?.content
              : "Your nickname"}
          </p>
        </div>

        <ul className="flex flex-col gap-4 mt-8 w-full">
          {links !== undefined
            ? links?.map((link, i) => {
              return <Link key={i} link={link} design={colors?.link} />;
            })
            : Array(3)
              .fill(0)
              .map((_, i) => (
                <li
                  key={i}
                  className="p-2 w-full bg-gray-200 rounded-lg text-gray-600 text-center font-bold"
                >
                  Your Link
                </li>
              ))}
        </ul>
      </div>

      {/* {!hasLinkName && (
        <div className="fixed z-50 bg-gray-900/20 top-0 bottom-0 left-0 right-0" />
      )}

      <div
        className={`p-3 min-w-min flex flex-col font-bold items-center absolute z-[200] duration-150 top-24 opacity-0 bg-slate-50 rounded-lg shadow-lg shadow-blue-400/30 ${!hasLinkName && "opacity-100"
          }`}
      >
        <div className="absolute w-6 h-6 bg-slate-50 top-[-10px] right-4 rotate-45 rounded-sm" />

        <Lightbulb color="#d6bd04" className="mb-2" />
        <p>To start building your media space</p>
        <p>create your link name!</p>
      </div> */}
    </>
  );
}
