"use client";

import { Link } from "@/types/types";
import { Edit, LinkIcon } from "lucide-react";
import { useState } from "react";

type LinkListProps = {
  links: Link[];
};

export default function LinkList({ links }: LinkListProps) {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<Link | null>(null);

  if (links.length === 0) return;
  return (
    <>
      <ul className="mt-4 pt-6 w-full flex flex-col ">
        {links.map((link) => (
          <li
            key={link.name}
            className="border flex mb-3 justify-between border-blue-500 rounded-full py-3 px-5 w-full hover:border-blue-600 hover:shadow-md hover:shadow-blue-100 duration-150"
          >
            <div>
              <p className="font-bold ml-5 text-blue-700">{link.name}</p>
              <span className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <LinkIcon size={15} /> {link.url}
              </span>
            </div>

            <button
              onClick={() => {
                setOpen(true);
                setField({ type: link.type, name: link.name, url: link.url });
              }}
              className="p-1 hover:text-blue-800 duration-200 text-blue-600 rounded-full"
            >
              <Edit size={20} />
            </button>
          </li>
        ))}
      </ul>

      {/* {open && <AddLink open={open} setOpen={setOpen} field={field} />} */}
    </>
  );
}
