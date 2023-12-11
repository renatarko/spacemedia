"use client";

import { usePreview } from "@/context/preview";
import { Link as LinkDB } from "@/types/types";
import { DocumentData } from "firebase/firestore";
import Link from "./link";
import LinkName from "./linkName";

type User = {
  title: string;
  avatar: string;
  nickname: string;
  linkName: string;
  background?: string;
  career?: string;
  links: LinkDB[];
};

type PhonePreviewProps = {
  data: User | DocumentData | undefined;
};

export default function PhonePreview({ data }: PhonePreviewProps) {
  const { links, colors, userPreview } = usePreview();

  return (
    <div className="h-full md:px-12 px-1 flex flex-col items-center  w-full ">
      <LinkName linkNameSaved={data?.linkName} />

      <aside className="px-6 overflow-x-hidden mt-20 relative pb-8 h-[44rem] overflow-y-auto border-[12px] sm:border-[12px] lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-gray-700">
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 border-4 border-gray-600 z-[-1]`}
          style={{ background: data?.background }}
        />
        <img
          src={data?.avatar ? data.avatar : userPreview.avatar!}
          alt={`image`}
          className="w-24 h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg"
          // width={300}
          // height={300}
        />
        <div className="flex flex-col items-center z-10 mt-8">
          <h1 className="text-2xl font-bold">
            {data?.title ? data.title : userPreview.title}
          </h1>
          <h2 className="text-xl">
            {data?.career ? data.career : userPreview.career}
          </h2>

          <p className="mt-4 text-base font-bold text-gray-500">
            @{data?.nickname ? data.nickname : userPreview?.nickname}
          </p>
        </div>

        <ul className="flex flex-col gap-4 mt-8 w-full">
          {data?.links.map((link: any, i: any) => (
            <Link
              key={i}
              url={link.url}
              icon={""}
              background={link.background}
              color={link.color}
            >
              {link.name}
            </Link>
          ))}
        </ul>

        <p className="text-blue-700 font-light absolute m-2 bottom-0 text-sm mt-12">
          media space
        </p>
      </aside>
    </div>
  );
}
