"use client";

import { usePreview } from "@/context/preview";
import { User } from "@/types/types";
import { DocumentData } from "firebase/firestore";
import Link from "./link";
import LinkName from "./linkName";

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
  data: User | DocumentData | undefined;
};

export default function PhonePreview({ data }: PhonePreviewProps) {
  const { links, colors, userPreview } = usePreview();

  const gradient = `linear-gradient(to ${colors.background?.direction}, ${colors.background?.gradient?.firstColor}, ${colors.background?.gradient?.secondColor})`;

  return (
    <div className="h-full md:px-12 px-1 flex flex-col items-center w-full max-w-xl">
      <LinkName linkNameSaved={data?.linkName} />

      <aside className="px-6 overflow-x-hidden mt-20 relative pb-8 h-[40rem] overflow-y-auto border-[12px] sm:border-[12px] lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-gray-700">
        <div
          className={`absolute top-0 bottom-0 left-0 bg-transparent right-0 border-4 border-gray-600 z-[-1]`}
          style={{
            background: !colors.background.color
              ? gradient
              : colors.background.color,
          }}
        />
        <div className="w-24 h-24 relative rounded-full border-4 border-white mt-8 z-10 shadow-lg overflow-hidden">
          <img
            src={data?.avatar ? data.avatar : userPreview.avatar!}
            alt={`image`}
            className="w-full  "
            // width={300}
            // height={300}
          />

          <div className="absolute bg-gray-200 w-full h-full animate-pulse" />
        </div>

        <div className="flex flex-col items-center z-10 mt-8">
          <h1
            className="text-2xl font-bold"
            style={{
              color: colors.title.color,
              fontSize: colors.title.size ? colors.title.size : "1.5rem",
            }}
          >
            {data?.title.content
              ? data.title.content
              : userPreview.title.content}
          </h1>
          <h2
            className="text-xl"
            style={{
              color: colors.career.color,
              fontSize: colors.career.size ? colors.career.size : "1.25rem",
            }}
          >
            {data?.career.content
              ? data.career.content
              : userPreview.career.content}
          </h2>

          <p
            className="mt-4 text-base font-bold text-gray-500"
            style={{
              color: colors.nickname.color,
              fontSize: `${
                data?.title.size
                  ? data.title.size + "px"
                  : colors.title.size + "px"
              } `,
            }}
          >
            @
            {data?.nickname.content
              ? data.nickname.content
              : userPreview?.nickname.content}
          </p>
        </div>

        <ul className="flex flex-col gap-4 mt-8 w-full">
          {data?.link.links.length > 0
            ? data?.link.links.map((link: any, i: any) => (
                <Link
                  key={i}
                  // url={link.url}
                  link={link}
                  // icon={""}
                  background={
                    colors.link.background
                      ? colors.link.background
                      : data.link.background
                    // ? data.link.background
                    // : colors.link_background
                  }
                  color={
                    colors.link.color ? colors.link.color : data.link.color
                  }
                />

                // </Link>
              ))
            : links.map((link, i) => (
                <Link
                  // link={link}
                  key={i}
                  link={link.link}
                  // url={link.url}
                  // icon={""}
                  background={""}
                  color={""}
                  size={link.size}
                  weight={link.size}
                />
                // </Link>
              ))}
        </ul>

        <p
          className="font-light absolute m-2 bottom-0 text-sm mt-12"
          style={{ color: colors.title.color }}
        >
          media space
        </p>
      </aside>
    </div>
  );
}
