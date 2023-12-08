"use client";

import { usePreview } from "@/context/preview";
import { Plus } from "lucide-react";
import { useState } from "react";
import Input from "./input";
import { LinkProps } from "./link";

export default function Links() {
  // const { user, logout } = useAuth();
  const { links, setLinks, colors, setColors, user, setUser } = usePreview();

  const [linkPrev, setLinkPrev] = useState<LinkProps>({
    children: "",
    icon: <Plus />,
    url: "",
    background: "#fff",
    color: "#fff",
  });

  const handleInput = (e: any) => {
    const { value, name } = e.target;
    setLinkPrev({ ...linkPrev, children: value, url: value });
  };

  console.log({ linkPrev });

  const pushLink = () => {
    if (!linkPrev) return;

    // setLinks([
    //   ...links,
    //   {
    //     path: linkPrev.children,
    //     children: linkPrev.url,
    //     icon: <Instagram />,
    //     color: "",
    //     background: "",
    //   },
    // ]);
  };

  return (
    <div className="flex flex-col items-center">
      <article className="flex flex-col">
        <div className="flex flex-col gap-12 mt-6">
          <div className="flex gap-2">
            <label htmlFor="bg">Background</label>
            <input
              id="bg"
              type="color"
              onChange={(e) => setColors({ ...colors, bg: e.target.value })}
            />
          </div>

          {/* <Input
            type="text"
            name="title"
            labelFor="title"
            label="Title"
            value={user?.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          /> */}
          {/* <Input
            type="text"
            label="Career"
            labelFor="career"
            onChange={(e) => setUser({ ...user, career: e.target.value })}
            value={user?.career}
          /> */}
          {/* <Input
            type="text"
            label="Subtitle"
            labelFor="subtitle"
            onChange={(e) => setSubtitle(e.target.value)}
            value={user?.name}
          /> */}

          <div className="flex items-center gap-3">
            <Input
              type="text"
              name="links"
              label="Links"
              labelFor="links"
              onChange={handleInput}
              value={linkPrev?.url}
            />

            <label htmlFor="color">Color</label>
            <input
              type="color"
              name="color"
              id="color"
              onChange={(e) => setColors({ ...colors, color: e.target.value })}
            />

            <label htmlFor="background">Background</label>
            <input
              type="color"
              name="background"
              id="background"
              onChange={(e) =>
                setColors({ ...colors, background: e.target.value })
              }
            />

            <button
              onClick={pushLink}
              type="button"
              className="p-2 hover:bg-gray-200 rounded-full duration-200"
            >
              <Plus className="text-blue-500" />
            </button>
          </div>
        </div>
      </article>

      {/* <Image
        src={userLocal!.photoURL}
        alt={`Foto de ${userLocal?.displayName}`}
        className="w-24 h-24 rounded-full border-4 border-white"
        width={300}
        height={300}
      /> */}
    </div>
  );
}
