"use client";

import { useAuth } from "@/context/authGoogle";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const { loginWithGoogle, loginWithEmailAndPassword } = useAuth();

  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [inputType, setInputType] = useState(false);
  const [messageError, setMessageError] = useState("");

  const handleInput = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form className="mt-16">
      <button
        type="button"
        onClick={loginWithGoogle}
        className="flex items-center text-lg hover:shadow-lg shadow duration-150 justify-center gap-4 mb-12 w-full bg-white text-blue-500 font-bold py-3 rounded-md"
      >
        <Image
          src="/google.png"
          alt="google logo"
          className="w-6 h-6 rounded-full"
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
          name="email"
          className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
            isFocus.email && "border-blue-500 hover:border-blue-500"
          }`}
          onFocus={() => setIsFocus({ ...isFocus, email: true })}
          onBlur={() => !user.email && setIsFocus({ ...isFocus, email: false })}
          onChange={handleInput}
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
          name="password"
          type={!inputType ? "password" : "text"}
          onFocus={() => setIsFocus({ ...isFocus, password: true })}
          onBlur={() =>
            !user.password && setIsFocus({ ...isFocus, password: false })
          }
          onChange={handleInput}
          className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
            isFocus.password && "border-blue-500 hover:border-blue-500"
          }`}
        />
        <button
          className="absolute right-2 top-3"
          type="button"
          onClick={() => setInputType(!inputType)}
        >
          <Eye size={20} className="text-blue-600/60" />
        </button>
      </div>

      <p className="mt-1 pl-2 text-red-600/80 shadow-none text-sm">
        {messageError}
      </p>

      <p className="text-end font-bold text-blue-500 hover:text-blue-600 mt-8">
        Forgot your password?
      </p>

      <button
        type="button"
        onClick={() => {
          const isValid =
            user.email !== "" && user.password !== "" ? true : false;

          !isValid && setMessageError("Fill all the fields");
          isValid && loginWithEmailAndPassword(user.email, user.password);
        }}
        className="mt-12 mb-12 w-full bg-white text-blue-500 font-bold py-3 rounded-md shadow hover:shadow-lg duration-150"
      >
        Sign in
      </button>

      <Link
        href="/sign-up"
        className="inline-block w-full text-center text-blue-500 hover:text-blue-600 font-bold"
      >
        Don&#8242;t have an account?
      </Link>
    </form>
  );
}
