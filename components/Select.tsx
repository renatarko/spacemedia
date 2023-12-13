"use client";

import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { ChevronDown } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type DropdownProps = {
  label?: string;
  labelFor?: string;
  name?: string | any;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  options: any[];
};

export default function Select({
  label,
  labelFor,
  name,
  value,
  onChange,
  options,
}: DropdownProps) {
  const [checked, setChecked] = useState(false);
  const [option, setOption] = useState(options[0]);

  const selectRef = useRef<HTMLDivElement>(null);

  const saveSelected = async () => {
    console.log(name, value);

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        selectRef.current &&
        e.target instanceof Node &&
        !selectRef.current.contains(e.target)
      ) {
        setChecked(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [checked]);

  return (
    <>
      <div className="relative max-w-max mt-2" ref={selectRef}>
        <label htmlFor={labelFor}>{label}</label>
        <input
          type="checkbox"
          id={labelFor}
          checked={checked}
          className="absolute inset-0 border border-red-300 cursor-pointer opacity-0"
          onChange={() => setChecked(!checked)}
        />
        <div
          className={`flex mt-2 items-center justify-between rounded-full p-2 bg-gray-200 border ${
            checked && "border-blue-500"
          }`}
        >
          <div className="mr-2 font-bold">{option}</div>
          <span
            className={`${checked && "rotate-180 text-blue-600"} duration-150`}
          >
            <ChevronDown />
          </span>
        </div>

        <ul
          className={`mt-2 border bg-gray-50 absolute w-full z-30 rounded-lg duration-200 border-blue-500 divide-y overflow-hidden divide-gray-200  ${
            checked ? "block shadow-lg" : "hidden"
          }`}
        >
          {options.map((item) => (
            <li
              key={item}
              className={`flex justify-center items-center gap-2 p-3 relative group focus-within:bg-blue-600 focus-within:text-white focus-within:hover:bg-blue-800 group hover:bg-gray-200 ${
                option === item && "text-white bg-blue-800"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={item}
                className="absolute inset-0 opacity-0  cursor-pointer z-20 outline outline-1 hover:outline-blue-300 focus:outline-blue-300 hover:bg-gray-400"
                onClick={() => {
                  setOption(item);
                }}
                onChange={onChange}
                onBlur={saveSelected}
              />
              <span
                className={`${item === "bold" && "font-bold"} ${
                  item === "normal" && "font-normal"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
