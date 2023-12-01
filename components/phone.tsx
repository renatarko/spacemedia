"use client";

import { usePreview } from "@/context/preview";
import Image from "next/image";
import Link from "./link";

export default function Phone() {
  const { image, title, subtitle, career, links, colors } = usePreview();
  return (
    <aside className="px-6 justify-self-end overflow-x-hidden relative pb-8 h-[44rem] overflow-y-auto border-[12px] sm:border-[12px] lg:w-[75%] w-full flex flex-col items-center rounded-2xl border-black">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 border-4 border-gray-800 z-[-1]`}
        style={{ background: colors.bg }}
      />
      <Image
        src={image}
        alt={`image`}
        className="w-24 h-24 rounded-full border-4 border-white mt-8 z-10 shadow-lg"
        width={300}
        height={300}
      />
      <div className="flex flex-col items-center z-10 mt-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-xl">{career}</h2>

        <p className="mt-4 text-lg font-bold">@{subtitle}</p>
      </div>

      <ul className="flex flex-col gap-4 mt-8 w-full">
        {links.map((link, i) => (
          <Link
            key={i}
            path={link.path}
            icon={link.icon}
            background={colors.background}
            color={colors.color}
          >
            {link.children}
          </Link>
        ))}
      </ul>

      <p className="text-blue-500 font-bold text-sm mt-12">media space</p>
    </aside>
  );
}
