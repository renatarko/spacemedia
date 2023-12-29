import SignIn from "@/components/register/sign-in";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | Media Space",
};

export default function Login() {
  return (
    <main className="grid grid-cols-2 gap-12 bg-[#f8f8f8] items-center h-screen">
      <article className="bg-gradient-to-l from-blue-500 to-blue-800 relative h-full flex pt-56 pl-12 flex-col">
        <h1 className="text-5xl font-bold">
          Welcome to <b className="text-white font-extrabold">Media Space</b>
        </h1>
        <h4 className="text-2xl leading-10 mt-8 font-medium text-gray-100">
          Your contacts your way!
        </h4>

        <Image
          src="/image2.png"
          alt="image 2"
          className="absolute left-[-4rem] bottom-0 w-[25rem]"
          draggable={false}
          width={500}
          height={500}
        />
      </article>

      <aside className="w-full pr-12">
        <h2 className="font-bold mb-8 text-3xl text-blue-600">Login</h2>
        <SignIn />
      </aside>
    </main>
  );
}
