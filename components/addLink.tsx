"use client";

import Input from "@/components/input";
import { auth } from "@/config/firebase";
import { mediasType } from "@/functions/constant";
import { AddLinkOnLinksMutation } from "@/functions/mutation";
import { Link } from "@/types/types";
import { Plus } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";

type AddLinkProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddLink({ open, setOpen }: AddLinkProps) {
  const [link, setLink] = useState<Link | null>({} as Link);
  const [disabled, setDisabled] = useState(true);
  const [linksSaved, setLinksSaved] = useState<Link[] | []>([]);

  const handleInputLink = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLink({ ...link, [name]: value });
  };

  const saveLink = async () => {
    const uid = auth.currentUser?.uid;

    if (link === null) {
      setDisabled(true);
      return;
    }

    try {
      await AddLinkOnLinksMutation(uid!, link);
      setLink(null);
      setLinksSaved([...linksSaved, link]);
      setOpen(false);
      toast("Link created successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      {open && (
        <>
          <div className="flex flex-col z-50 mx-8 gap-8 absolute shadow-xlg rounded-lg right-0 left-0 bg-white py-6 px-10">
            <h3 className="font-bold ml-2">
              Select the link type, assign a name, and insert the link.
            </h3>

            <select
              id="select"
              className="mb-6 p-3 outline-none border border-[##0B6174/30] rounded-full cursor-pointer"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setLink({ ...link, type: e.target.value });
                // setLink({ ...link, url: unMask("") });
              }}
            >
              {mediasType.map((media) => (
                <option key={media.name} value={media.name.toLowerCase()}>
                  {media.name}
                </option>
              ))}
            </select>

            <Input
              name="name"
              label="Name"
              labelFor="link"
              value={link?.name}
              onChange={(e) => {
                handleInputLink(e);
              }}
            />

            {link?.type === "Phone" || link?.type === "WhatsApp" ? (
              <Input
                name="url"
                label="URL"
                labelFor="url"
                onChange={(e) => {
                  handleInputLink(e);
                  setDisabled(false);
                }}
                value={link?.url || ""}
              />
            ) : link?.type === "Email" ? (
              <Input
                name="url"
                label="URL"
                labelFor="url"
                type="email"
                required
                value={link?.url || ""}
                onChange={(e) => {
                  handleInputLink(e);
                  setDisabled(false);
                }}
              />
            ) : (
              <Input
                name="url"
                label="URL"
                labelFor="url"
                type="text"
                value={link?.url || ""}
                onChange={(e) => {
                  handleInputLink(e);
                  setDisabled(false);
                }}
              />
            )}

            <div className="flex justify-end gap-3 ">
              <button
                onClick={() => setOpen(false)}
                className="p-2 px-4 bg-gray-200 rounded-full hover:bg-gray-300/70 cursor-pointer"
              >
                Cancel
              </button>
              <Button
                onClick={saveLink}
                disabled={disabled}
                title={disabled ? "Fill the input to save" : "Save the link"}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="absolute bg-gray-500/50 top-0 bottom-0 left-0 right-0 z-40" />
        </>
      )}
      {/* <LinkList links={linksSaved} /> */}

      <button
        onClick={() => setOpen(true)}
        className="mt-3 p-2 w-max bg-blue-100/50 self-center text-blue-600 rounded-full hover:bg-blue-100 duration-150"
      >
        <Plus />
      </button>
    </>
  );
}
