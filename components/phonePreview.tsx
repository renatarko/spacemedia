"use client";

import { usePreview } from "@/context/preview";
import { User } from "@/types/types";
import { DocumentData } from "@firebase/firestore";
import { useEffect } from "react";
import Link from "./link";

// type User = {
//   title: string;
//   avatar: string;
//   nickname: string;
//   linkName: string;
//   background?: string;
//   career?: string;
//   links: LinkDB[];
// };

type PhonePreviewProps = {
  data: DocumentData | undefined;
  // data: UserDocument;
};

export default function PhonePreview({ data }: PhonePreviewProps) {
  const { links, colors, userPreview, setUserPreview, setColors, setLinks } =
    usePreview();
  const gradient = `linear-gradient(to ${colors?.background?.direction}, ${colors?.background?.gradient?.firstColor}, ${colors?.background?.gradient?.secondColor})`;

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
    setLinks(data?.link.links);
  }, []);

  return (
    // <div className="h-full md:px-12 px-1 flex flex-col items-center w-full max-w-xl">
    //   <LinkName linkNameSaved={data?.linkName} />

    <div className="px-6 overflow-x-hidden shadow-2xl mt-20 relative pb-16 overflow-y-auto lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-gray-700">
      <div
        className={`absolute top-0 bottom-0 left-0 bg-transparent right-0 z-[-1]`}
        style={{
          background:
            colors?.background.type === "gradient"
              ? gradient
              : colors?.background.color,
        }}
      />
      <div className="w-24 relative h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg overflow-hidden">
        <img
          src={userPreview.avatar ? userPreview.avatar! : data?.avatar}
          alt={""}
          className=" w-full object-cover z-0"
        />

        <div className="absolute bg-gray-200 w-full h-full animate-pulse z-20" />
      </div>

      <div className="flex flex-col items-center z-10 mt-8">
        <h1
          className="text-2xl font-bold"
          style={{
            color: colors?.title?.color!,
            fontSize: colors?.title?.size! ? colors?.title?.size! : "1.5rem",
          }}
        >
          {/* {data?.title.content
              ? data.title.content
              : userPreview.title.content} */}
          {userPreview?.title?.content}
        </h1>
        <h2
          className="text-xl"
          style={{
            color: colors?.career?.color!,
            fontSize: colors?.career?.size! ? colors?.career?.size! : "1.25rem",
          }}
        >
          {/* {data?.career?.content
              ? data.career?.content
              : userPreview.career.content} */}
          {userPreview.career.content!}
        </h2>

        <p
          className="mt-4 text-base font-bold text-gray-500"
          style={{
            color: colors?.nickname?.color,
            fontSize: `${
              colors?.nickname?.size
                ? colors?.nickname?.size + "px"
                : userPreview.nickname.size! + "px"
              // data?.title.size
              //   ? data.title.size + "px"
              //   : colors.title.size + "px"
            } `,
          }}
        >
          @
          {/* {data?.nickname.content
              ? data.nickname.content
              : userPreview?.nickname.content} */}
          {userPreview.nickname.content}
        </p>
      </div>

      <ul className="flex flex-col gap-4 mt-8 w-full">
        {links.map((link, i) => {
          // console.log("link", { link });
          return <Link key={i} link={link} design={colors.link} />;
        })}
        {/* {data?.link.links.length > 0
            ? data?.link.links.map((link: any, i: any) => (
                <Link
                  key={i}
                  link={link}
                  background={
                    colors.link.background
                      ? colors.link.background
                      : data.link.background
                  }
                  color={
                    colors.link.color ? colors.link.color : data.link.color
                  }
                />
              ))
            : links.map((link, i) => (
                <Link
                  key={i}
                  link={link.link}
                  background={""}
                  color={""}
                  size={link.size}
                  weight={link.size}
                />
              ))} */}
      </ul>

      <p
        className="font-light absolute m-2 bottom-0 text-sm mt-12"
        style={{ color: colors?.title?.color }}
      >
        media space
      </p>
    </div>
    // {/* </div> */}
  );
}
