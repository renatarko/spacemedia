"use client";

import { auth } from "@/config/firebase";
import { saveLinkNameMutation } from "@/functions/mutation";
import { getUserDataQuery } from "@/functions/query";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type LinkNameProps = {
  linkNameSaved: string;
};

export default function LinkName({ linkNameSaved }: LinkNameProps) {
  const [showInput, setShowInput] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkNameSave, setLinkNameSave] = useState("");

  const route = useRouter();

  const saveLinkName = async () => {
    if (!linkName) {
      toast("Choose your link name to continue");
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) return;
    try {
      await saveLinkNameMutation(uid, linkName);
      setShowInput(false);
      getLinkNameSaved();
      toast("Link name created successfully");
      route.refresh();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Something it's wrong, please try again!");
    }
  };

  const getLinkNameSaved = async () => {
    const uid = auth.currentUser?.uid;

    try {
      await getUserDataQuery(uid!);
      setLinkNameSave(linkName);
    } catch (error) {
      console.log(error);
    }
  };

  if (linkNameSaved) {
    return (
      <div className="flex items-center mt-8 z-[100]">
        <p className="text-blue-500/50 text-sm">http://mediaspace/</p>
        <p className="ml-1 text-blue-500">{linkNameSaved}</p>
      </div>
    );
  }

  if (linkNameSave) {
    return (
      <div className="flex items-center mt-8 z-[100]">
        <p className="text-blue-500/50 text-sm">http://mediaspace/</p>
        <p className="ml-1 text-blue-500">{linkNameSave}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8 z-[200]">
      <div className="flex items-center">
        <p className="text-blue-600 font-bold text-md">http://mediaspace/</p>

        {showInput ? (
          <div className="bg-gray-50 ml-2 p-1 rounded-sm focus-within:border-b-blue-500 border-[4px] border-transparent flex items-center">
            <input
              className={`bg-transparent  outline-none text-blue-600 `}
              onChange={(e) => setLinkName(e.target.value)}
            />
            {linkName.length > 3 ? (
              <button
                onClick={saveLinkName}
                className={`hover:text-blue-600 bg-blue-100/50 hover:bg-blue-100 text-blue-500 cursor-pointer p-1 rounded-full`}
              >
                <Check size={20} />
              </button>
            ) : (
              <button
                onClick={() => setShowInput(false)}
                className="hover:text-blue-600 text-blue-500 cursor-pointer p-1"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="text-blue-600 p-1 bg-white/70 hover:bg-blue-400 hover:text-white duration-150 rounded-full"
          >
            add link name
          </button>
        )}
      </div>
    </div>
  );
}
