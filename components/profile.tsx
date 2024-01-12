"use client";

import { auth, db } from "@/config/firebase";
import { usePreview } from "@/context/preview";
import { Link } from "@/types/types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import AddLink from "./addLink";
import Button from "./button";
import LinkEdit from "./linkEdit";
import Text from "./title";
import Upload from "./upload";

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
  userRef: DocumentData | undefined;
};

export default function Profile({ userRef }: ProfileProps) {
  const { userPreview, setUserPreview, links, setLinks } = usePreview();
  const [open, setOpen] = useState(false);
  const uid = auth.currentUser?.uid;

  const reorderLinkList = (
    linkList: Link[],
    indexStart: number,
    indexEnd: number
  ) => {
    const result = Array.from(linkList);
    const [itemLink] = result.splice(indexStart, 1);
    result.splice(indexEnd, 0, itemLink);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newList = reorderLinkList(
      links,
      result.source.index,
      result.destination.index
    );
    setLinks(newList);
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const saveWhenInputBlur = async (field: string, value: string) => {
    try {
      const docRef = doc(db, "users", uid!);

      const updateObject: { [key: string]: any } = {};
      updateObject[field] = { content: value };

      await setDoc(docRef, updateObject, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative h-full flex flex-col">
        <h3 className="mt-8 text-blue-600 font-bold">Hi, Renata</h3>
        <div className="flex flex-col customScrollNav overflow-y-auto md:px-12 px-1 h:[35rem] sm:h-[47rem] mt-8 divide pb-12 divide-y-2 divide-gray-400/20">
          {userRef?.linkName.content ? (
            <div className="flex flex-col gap-4 w-full rounded-lg">
              <Upload user={userRef} />

              <div className="border flex py-3 px-5 w-full bg-blue-950/5 hover:bg-blue-950/10 rounded-lg duration-150">
                <label
                  htmlFor="title"
                  className="font-bold text-blue-700 focus-within:border-blue-500 border-b border-transparent w-full"
                >
                  Title
                  <input
                    id="title"
                    className="bg-transparent text-gray-950 outline-none flex items-center gap-2 mt-1 placeholder:text-sm placeholder:text-gray-400"
                    value={userPreview.title.content}
                    onChange={(e) =>
                      setUserPreview({
                        ...userPreview,
                        title: {
                          ...userPreview.title,
                          content: e.target.value,
                        },
                      })
                    }
                    placeholder="ex: Renata K."
                    onBlur={() =>
                      saveWhenInputBlur("title", userPreview.title.content)
                    }
                  />
                </label>
              </div>

              <div className="border flex-col flex py-3 px-5 w-full bg-blue-950/5 hover:bg-blue-950/10 rounded-lg duration-150">
                <label
                  htmlFor="career"
                  className="font-bold text-blue-700 focus-within:border-blue-500 w-full border-b border-transparent"
                >
                  Career
                  <input
                    id="career"
                    className="bg-transparent text-gray-950 outline-none flex items-center gap-2 mt-1 placeholder:text-sm placeholder:text-gray-400"
                    value={userPreview.career.content}
                    onChange={(e) =>
                      setUserPreview({
                        ...userPreview,
                        career: {
                          ...userPreview.career,
                          content: e.target.value,
                        },
                      })
                    }
                    onBlur={() =>
                      saveWhenInputBlur("career", userPreview.career.content)
                    }
                    placeholder="ex: Software Developer"
                  />
                </label>
              </div>

              <div className="border flex flex-col py-3 px-5 w-full bg-blue-950/5 hover:bg-blue-950/10 rounded-lg duration-150">
                <label
                  htmlFor="nickname"
                  className="font-bold text-blue-700 focus-within:border-blue-500 w-full border-b border-transparent"
                >
                  Nickname
                  <input
                    id="nickname"
                    className="bg-transparent text-gray-950 outline-none flex items-center gap-2 mt-1 placeholder:text-sm placeholder:text-gray-400"
                    value={userPreview.nickname.content}
                    onChange={(e) =>
                      setUserPreview({
                        ...userPreview,
                        nickname: {
                          ...userPreview.nickname,
                          content: e.target.value,
                        },
                      })
                    }
                    placeholder="@renata_rko"
                    onBlur={() =>
                      saveWhenInputBlur(
                        "nickname",
                        userPreview.nickname.content
                      )
                    }
                  />
                </label>
              </div>
            </div>
          ) : (
            <Text
              title="Start by choosing"
              titleContrast="the link name"
              subtitle="Now you decide on your"
              subtitleContrast="media space"
            />
          )}

          {userRef?.link.links.length === 0 && (
            <Button
              isAnchor={false}
              onClick={() => setOpen(true)}
              icon={<LinkIcon size={20} />}
            >
              create link
            </Button>
          )}

          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="links" direction="vertical">
              {(provided) =>
                links?.length > 0 && (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-4 pt-6 w-full flex flex-col"
                  >
                    {links.map((link, i) => (
                      <LinkEdit link={link} key={i} index={i} />
                    ))}

                    {provided.placeholder}
                  </ul>
                )
              }
            </Droppable>
          </DragDropContext>

          <AddLink open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
