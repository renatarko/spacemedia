"use client";

import { useAuth } from "@/context/authGoogle";
import Image from "next/image";
import { useState } from "react";

export default function Form() {
  const { signWithGoogle } = useAuth();

  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });

  return (
    <form className="mt-16">
      <button
        type="button"
        onClick={signWithGoogle}
        className="flex items-center text-lg hover:shadow-lg shadow duration-150 justify-center gap-4 mb-12 w-full bg-white text-blue-500 font-bold py-3 rounded-md"
      >
        <Image
          src="/google.png"
          alt="google logo"
          className="w-8 h-8 rounded-full"
          width={100}
          height={100}
        />
        Sign in with Google
      </button>

      <div className="flex flex-col relative shadow-md">
        <label
          htmlFor="email"
          className={`absolute top-2 left-2 duration-200 ${
            isFocus.email && "-translate-y-9 text-blue-500 font-semibold"
          }`}
        >
          Email
        </label>
        <input
          id="email"
          className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
            isFocus.email && "border-blue-500 hover:border-blue-500"
          }`}
          onFocus={() => setIsFocus({ ...isFocus, email: true })}
          onBlur={() => setIsFocus({ ...isFocus, email: false })}
        />
      </div>

      <div className="flex flex-col relative mt-10 shadow-md">
        <label
          htmlFor="password"
          className={`absolute top-2 left-2 duration-200 ${
            isFocus.password && "-translate-y-9 text-blue-500 font-semibold"
          }`}
        >
          Password
        </label>
        <input
          id="password"
          onFocus={() => setIsFocus({ ...isFocus, password: true })}
          onBlur={() => setIsFocus({ ...isFocus, password: false })}
          className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
            isFocus.password && "border-blue-500 hover:border-blue-500"
          }`}
        />
      </div>

      <p className="text-end font-bold text-blue-500 mt-8">
        Forgot your password?
      </p>

      <button
        type="button"
        onClick={signWithGoogle}
        className="mt-16 w-full bg-white text-blue-500 font-bold py-3 rounded-md shadow hover:shadow-lg duration-150"
      >
        Sign in
      </button>
    </form>
  );
}
