"use client";

import { usePreview } from "@/context/preview";
import { DocumentData } from "firebase/firestore";
import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import AddLink from "./addLink";
import Button from "./button";
import LinkList from "./linkList";

const mediasType = [
  { name: "Select the link type", path: "" },
  { name: "Link", path: "" },
  { name: "WhatsApp", path: "" },
  { name: "Instagram", path: "" },
  { name: "Facebook", path: "" },
  { name: "TikToc", path: "" },
  { name: "Email", path: "" },
  { name: "Phone", path: "" },
];

type ProfileProps = {
  user: DocumentData | undefined;
};

export default function Profile({ user }: ProfileProps) {
  const { links, colors, setUser } = usePreview();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative h-full pt-24 px-12 flex flex-col">
        <h3 className="">Hi, Renata</h3>
        <h1 className="font-bold text-3xl mt-4 z-10">
          Start by choosing{" "}
          <span className="relative before:w-full before:z-[-1] before:bottom-0 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
            the link name
          </span>
          .
        </h1>
        <h2 className="text-4xl mt-8 mb-8 font-bold">
          Now you decide on your{" "}
          <span className="relative before:w-full before:z-[-1] before:bottom-0 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
            media space
          </span>{" "}
          design.
        </h2>

        {/* <input placeholder="name" onChange={(e) => setUser({...user, name: e.target.value})} /> */}

        {user?.links.length === 0 && (
          <Button onClick={() => setOpen(true)} icon={<LinkIcon size={20} />}>
            create link
          </Button>
        )}

        {user?.links.length && <LinkList links={user?.links} />}

        <AddLink open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
