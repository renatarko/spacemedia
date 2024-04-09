"use client";

import Input from "@/components/input";
import { auth } from "@/config/firebase";
import { usePreview } from "@/context/preview";
import { mediasType } from "@/functions/constant";
import {
  AddLinkOnLinksMutation,
  updateLinksFieldMutation,
} from "@/functions/mutation";
import { Link } from "@/types/types";
import { Plus } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { mask, unmask } from "remask";
import Button from "./button";
import Select from "./Select";

type AddLinkProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  field?: Link | null;
};

export default function AddLink({ open, setOpen, field }: AddLinkProps) {
  const { links, setLinks } = usePreview();

  const [link, setLink] = useState<Link | null>(field || null);
  const [disabled, setDisabled] = useState(true);
  const [linksSaved, setLinksSaved] = useState<Link[] | []>([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState("initial");

  const handleInputLink = (e: ChangeEvent<HTMLInputElement>) => {
    if (link === null) setDisabled(true);
    const { name, value } = e.target;

    setLink((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        };
      }
      return null;
    });
  };

  const linkExist = () => {
    const exist = links?.filter((link) => link.url === field?.url);

    if (exist !== undefined && exist.length > 0) {
      const newLinksArray = links.filter((link) => link.url !== field?.url);
      return newLinksArray;
    }
    return null;
  };

  const saveLink = async () => {
    const uid = auth.currentUser?.uid;

    if (link === null) {
      setDisabled(true);
      return;
    }

    const data = {
      link: {
        name: link.name,
        type: link.type,
        url:
          link.type === "phone" || link.type === "whatsapp"
            ? unmask(link.url!)
            : link.url,
      },
    };

    setLoading("loading");

    try {
      const isLinkExist = linkExist();

      if (isLinkExist !== null) {
        const linksUpdated = [...isLinkExist, data.link];
        setLinks(linksUpdated);
        setLinksSaved(linksUpdated);

        await updateLinksFieldMutation(uid!, linksUpdated);
        setOpen(false);
        toast("Link updated successfully");

        return;
      }

      await AddLinkOnLinksMutation(uid!, data.link);
      setLink(null);
      links?.length > 0 ? setLinks([...links, link]) : setLinks([link]);

      setLinksSaved([...linksSaved, link]);
      setOpen(false);
      toast("Link created successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading("initial");
    }
  };

  return (
    <>
      {open && (
        <>
          <div className="flex flex-col z-50 mx-8 gap-8 top-[30%] absolute shadow-xlg rounded-lg right-0 left-0 bg-white py-6 px-10">
            <h3 className="font-bold ml-2">
              Select the link type, assign a name, and insert the link.
            </h3>

            <select
              id="select"
              className="mb-6 p-3 outline-none border border-[##0B6174/30] rounded-full cursor-pointer"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setLink({
                  ...link,
                  type: e.target.value,
                });
                setPath(e.target.value);
                // setLink({ ...link, url: unMask("") });
              }}
            >
              {mediasType.map((media) => (
                <option
                  key={media.name}
                  value={media.name.toLowerCase()}
                  selected={media.name.toLowerCase() === link?.type}
                >
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

            {link?.type === "phone" || link?.type === "whatsapp" ? (
              <Input
                name="url"
                label={
                  link.type === "phone" || link.type === "whatsapp"
                    ? "Phone number"
                    : ""
                }
                labelFor="url"
                onChange={(e) => {
                  handleInputLink(e);
                  setDisabled(false);
                }}
                value={mask(link.url!, "99 99999-9999")}
              />
            ) : link?.type === "email" ? (
              <Input
                name="url"
                label="URL"
                labelFor="url"
                type="email"
                required
                value={link?.url}
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
                value={link?.url}
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
                isAnchor={false}
                onClick={saveLink}
                disabled={disabled}
                title={disabled ? "Fill the input to save" : "Save the link"}
                loading={loading}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="absolute bg-gray-500/50 top-0 bottom-0 left-0 right-0 z-40" />
        </>
      )}
      {/* <LinkList links={linksSaved} /> */}

      {links?.length > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="mt-3 m-2 p-2  bottom-0 w-max bg-blue-100/50 self-center text-blue-600 rounded-full hover:bg-blue-100 duration-150"
        >
          <Plus />
        </button>
      )}
    </>
  );
}
