import SignUp from "@/components/register/sign-up";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="grid relative grid-cols-1 sm:grid-cols-2 sm:bg-[#f8f8f8] items-center h-screen ">
      <article className="hidden sm:flex bg-gradient-to-l from-blue-500 to-blue-800 relative h-full p-8 flex-col">
        <h1 className="text-5xl font-bold mt-40">Welcome to</h1>
        <br />
        <h1 className="text-white font-extrabold text-5xl mt-[-12px]">
          Media Space
        </h1>
        <h4 className="text-2xl leading-8 mt-8 font-medium text-gray-100">
          Your journey begins now! Create an account to make your media space
          your own.
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

      <aside className="h-full pt-16 p-8 absolute sm:relative w-full sm:bg-none bg-gradient-to-l from-blue-500 to-blue-800">
        <h2 className="font-bold mb-8 text-3xl text-blue-300 sm:text-blue-600">
          Sign Up
        </h2>
        <SignUp />
      </aside>
    </main>
  );
}
