import SignIn from "@/components/register/sign-in";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | Media Space",
};

export default function Login() {
  return (
    <main className="grid relative grid-cols-1 sm:grid-cols-2 sm:bg-[#f8f8f8] items-center h-screen ">
      <article className="hidden sm:flex bg-gradient-to-l from-blue-500 to-blue-800 relative h-full pt-56 p-8 flex-col">
        <h1 className="text-5xl font-bold ">
          Welcome to <b className="text-white font-extrabold">Media Space</b>
        </h1>
        <h4 className="text-2xl leading-10 mt-6 font-medium text-gray-100">
          Your contacts your way!
        </h4>

        <Image
          src="/image2.png"
          alt="image 2"
          className="absolute left-[-4rem] bottom-0 w-[18rem]"
          draggable={false}
          width={300}
          height={300}
        />
      </article>

      <aside className="h-full pt-16 p-8 absolute sm:relative w-full sm:bg-none bg-gradient-to-l from-blue-500 to-blue-800">
        <h2 className="font-bold mb-8 text-3xl text-blue-300 sm:text-blue-600">
          Login
        </h2>
        <SignIn />
      </aside>
    </main>
  );
}
