"use client";

import { useAuth } from "@/context/authGoogle";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function SignUp() {
  const { loginWithGoogle, signUpWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const [isFocus, setIsFocus] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [inputType, setInputType] = useState({
    isShowPassword: false,
    isShowPasswordConfirm: false,
  });
  const [messageError, setMessageError] = useState("");

  const handleInput = (e: any) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const checkSamePassword = () => {
    if (user.password !== user.passwordConfirm) {
      return setMessageError("Passwords don't match");
    } else {
      setMessageError("");
    }
  };

  return (
    <>
      <Toaster />
      <form>
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
          Sign up with Google
        </button>

        <div className="flex flex-col relative shadow-md rounded-md">
          <label
            htmlFor="email"
            className={`absolute top-2 left-2 duration-200 ${
              isFocus.name && "-translate-y-9 text-blue-500 font-semibold"
            }`}
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
              isFocus.name && "border-blue-500 hover:border-blue-500"
            }`}
            onFocus={() => setIsFocus({ ...isFocus, name: true })}
            onBlur={() => !user.name && setIsFocus({ ...isFocus, name: false })}
            onChange={handleInput}
            type="text"
          />
        </div>

        <div className="flex flex-col relative mt-10 shadow-md rounded-md">
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
            onBlur={() =>
              !user.email && setIsFocus({ ...isFocus, email: false })
            }
            onChange={handleInput}
            type="email"
          />
        </div>

        <div className="flex flex-col relative mt-10 shadow-md rounded-md">
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
            onFocus={() => setIsFocus({ ...isFocus, password: true })}
            onBlur={() =>
              !user.password && setIsFocus({ ...isFocus, password: false })
            }
            onChange={handleInput}
            type={inputType.isShowPassword ? "password" : "text"}
            className={`outline-none p-2 rounded-md border-2 border-transparent duration-150 hover:border-gray-400 ${
              isFocus.password && "border-blue-500 hover:border-blue-500"
            } ${user.password !== "" && "border-green-600/80"}`}
          />

          <button
            className="absolute right-2 top-3"
            type="button"
            onClick={() =>
              setInputType({
                ...inputType,
                isShowPassword: !inputType.isShowPassword,
              })
            }
          >
            <Eye size={20} className="text-blue-600/60" />
          </button>
        </div>

        <div className="flex flex-col relative mt-10  rounded-md">
          <label
            htmlFor="passwordConfirm"
            className={`absolute top-2 left-2 duration-200 ${
              isFocus.passwordConfirm &&
              "-translate-y-9 text-blue-500 font-semibold"
            }`}
          >
            Password Confirm
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            onFocus={() => setIsFocus({ ...isFocus, passwordConfirm: true })}
            onBlur={() => {
              !user.passwordConfirm &&
                setIsFocus({ ...isFocus, passwordConfirm: false });
              checkSamePassword();
            }}
            onInput={handleInput}
            type={inputType.isShowPasswordConfirm ? "password" : "text"}
            className={`outline-none p-2 shadow-md rounded-md border-2 border-transparent duration-150 ${
              isFocus.passwordConfirm && "border-blue-500"
            } ${
              (!user.passwordConfirm && "") ||
              (user.password !== user.passwordConfirm && "border-red-600/80")
            }`}
          />
          <p className="mt-1 pl-2 text-red-600/80 shadow-none text-sm">
            {messageError}
          </p>
          <button
            className="absolute right-2 top-3"
            type="button"
            onClick={() =>
              setInputType({
                ...inputType,
                isShowPasswordConfirm: !inputType.isShowPasswordConfirm,
              })
            }
          >
            <Eye size={20} className="text-blue-600/60" />
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            signUpWithEmailAndPassword(user.name, user.email, user.password)
          }
          className="mt-16 mb-12 w-full bg-white text-blue-500 font-bold py-3 rounded-md shadow hover:shadow-lg duration-150"
        >
          Sign up
        </button>

        <Link
          href="/login"
          className="inline-block w-full text-center text-blue-500 hover:text-blue-600 font-bold"
        >
          I already have an account
        </Link>
      </form>
    </>
  );
}
