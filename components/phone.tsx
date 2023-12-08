"use client";

import { usePreview } from "@/context/preview";
import { Link as LinkDB } from "@/types/types";
import Image from "next/image";
import Link from "./link";
import LinkName from "./linkName";

type PhoneProps = {
  data: {
    name: string;
    avatar: string;
    linkName: string;
    background?: string;
    career?: string;
    links: LinkDB[];
  };
};

export default function Phone({ data }: PhoneProps) {
  const { links, colors, user } = usePreview();
  return (
    <div className="h-full px-12 flex flex-col items-center  w-full ">
      <LinkName linkNameSaved={data.linkName} />

      <aside className="px-6 overflow-x-hidden mt-20 relative pb-8 h-[44rem] overflow-y-auto border-[12px] sm:border-[12px] lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-black">
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 border-4 border-gray-800 z-[-1]`}
          style={{ background: colors.bg }}
        />
        <Image
          src={"/image.png"}
          alt={`image`}
          className="w-24 h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-center z-10 mt-8">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <h2 className="text-xl">{user?.career}</h2>

          <p className="mt-4 text-lg font-bold">@{user?.name}</p>
        </div>

        <ul className="flex flex-col gap-4 mt-8 w-full">
          {links.map((link, i) => (
            <Link
              key={i}
              url={link.url}
              icon={link.icon}
              background={colors.background}
              color={colors.color}
            >
              {link.children}
            </Link>
          ))}
        </ul>

        <p className="text-blue-500 font-bold absolute m-2 bottom-0 text-sm mt-12">
          media space
        </p>
      </aside>
    </div>
  );
}
