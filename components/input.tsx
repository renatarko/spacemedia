"use client";

import { InputHTMLAttributes, useState } from "react";

type InputProps = {
  label: string;
  value?: any;
  labelFor: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  value,
  labelFor,
  ...props
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  console.log(value);
  return (
    <div className="flex flex-col relative shadow-md">
      <label
        htmlFor={labelFor}
        className={`absolute top-2 left-2 duration-200 ${
          isFocus && "-translate-y-9 text-blue-500 font-semibold"
        }`}
      >
        {label}
      </label>
      <input
        id={labelFor}
        className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
          isFocus && "border-blue-500 hover:border-blue-500"
        }`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => !value && setIsFocus(false)}
        {...props}
      />
    </div>
  );
}
