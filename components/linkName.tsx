"use client";

import { auth } from "@/config/firebase";
import { saveLinkNameMutation } from "@/functions/mutation";
import { getUserDataQuery } from "@/functions/query";
import { Check, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type LinkNameProps = {
  linkNameSaved: {
    content: string;
    color?: string;
  };
};

export default function LinkName({ linkNameSaved }: LinkNameProps) {
  const [showInput, setShowInput] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkNameSave, setLinkNameSave] = useState("");

  const saveLinkName = async () => {
    if (!linkName) {
      toast("Choose your link name to continue");
      return;
    }

    const uid = auth.currentUser?.uid;
    if (!uid) return console.log("não encontrou uia", uid);
    try {
      await saveLinkNameMutation(uid, linkName);
      setShowInput(false);
      getLinkNameSaved();
      toast("Link name created successfully");
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

  if (linkNameSaved?.content) {
    return (
      <div className="flex items-center mt-8">
        <p className="text-blue-500/50 text-sm">http://mediaspace/</p>
        <p className="ml-1 text-blue-500">{linkNameSaved?.content}</p>
      </div>
    );
  }

  if (linkNameSave) {
    return (
      <div className="flex items-center mt-8">
        <p className="text-blue-500/50 text-sm">http://mediaspace/</p>
        <p className="ml-1 text-blue-500">{linkNameSave}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center">
        <p className="text-blue-600 text-sm">http://mediaspace/</p>

        {showInput ? (
          <div className="bg-gray-100 ml-2 p-1 focus-within:border-b-blue-500 border border-transparent flex items-center">
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
              <X
                onClick={() => setShowInput(false)}
                size={20}
                className="hover:text-blue-600 text-blue-500 cursor-pointer"
              />
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="text-blue-600 p-1 bg-blue-300/20 hover:bg-blue-300 hover:text-blue-800 duration-150 rounded-full"
          >
            add link name
          </button>
        )}
      </div>
    </div>
  );
}
