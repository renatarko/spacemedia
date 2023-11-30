import SignUp from "@/components/register/sign-up";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="grid grid-cols-2 gap-12 bg-[#f8f8f8] items-center h-screen">
      <article className="bg-blue-500 relative h-full flex items-center pl-12 pr-12 flex-col">
        <h1 className="text-5xl font-bold mt-40">
          Welcome to <b className="text-white font-extrabold">Media Space</b>
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

      <aside className="w-full pr-12 mt-20">
        <h2 className="font-bold mb-8 text-3xl text-blue-500">Sign Up</h2>
        <SignUp />
      </aside>
    </main>
  );
}
