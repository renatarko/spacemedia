"use client";

import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { ChangeEvent } from "react";

type ColorProps = {
  label: string;
  labelFor: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  name?: string | any;
};

export default function Color({
  label,
  labelFor,
  onChange,
  value,
  name,
}: ColorProps) {
  const saveColors = async () => {
    const uid = auth.currentUser?.uid!;
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists) return null;

      await updateDoc(docRef, { [name]: value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <label className="mb-2">{label}</label>
      <fieldset className="flex gap-2">
        <div
          style={{ background: value ? value : "#000" }}
          className="w-10 h-10 mt-2 rounded-full bg-transparent overflow-hidden flex justify-center items-center"
        >
          <input
            title="Choose the color"
            type="color"
            className="w-10 h-10 opacity-0 bg-transparent border-transparent outline-none"
            value={value || ""}
            onChange={onChange}
            name={name}
            onBlur={saveColors}
          />
        </div>

        <label
          htmlFor={labelFor}
          className="bg-gray-200 rounded-lg border focus-within:border-blue-500 p-1 pl-4 flex flex-col"
        >
          <span className="text-blue-600">color</span>
          <input
            type="text"
            id={labelFor}
            className="bg-transparent outline-none"
            value={value || ""}
          />
        </label>
      </fieldset>
    </div>
  );
}
