"use client";

import { useAuth } from "@/context/authGoogle";

export default function Links() {
  const { user } = useAuth();
  console.log({ user });
  // const local = localStorage.getItem("@Auth:user");
  // const userLocal = JSON.parse(local!);
  // console.log({ userLocal });

  return (
    <div className="w-full flex flex-col items-center">
      <article className="flex flex-col mt-10">
        <h1 className="text-4xl font-bold">Hi, {user?.name}</h1>
        <h2 className="text-2xl mt-4">
          Now you decide on your media space design. Start by choosing the link
          name.
        </h2>
      </article>

      {/* <Image
        src={userLocal!.photoURL}
        alt={`Foto de ${userLocal?.displayName}`}
        className="w-24 h-24 rounded-full border-4 border-white"
        width={300}
        height={300}
      /> */}
    </div>
  );
}
