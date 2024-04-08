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
    <div className="flex flex-col relative">
      <label
        htmlFor={labelFor}
        className={`absolute top-2 text-[#0F8099] left-2 duration-200  font-semibold ${value && "-translate-y-8"
          } ${isFocus && '-translate-y-8'}`}
      >
        {label}
      </label>
      <input
        id={labelFor}
        className={`outline-none p-2 rounded-full border-2 border-[#0B6174/30] duration-150 ${isFocus && "border-[#0F8099]"}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        {...props}
      />
    </div>
  );
}
