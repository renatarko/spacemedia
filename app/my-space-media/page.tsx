"use client";

import { useAuth } from "@/context/authGoogle";
import Home from "../page";

export default function MySpaceMedia() {
  const { signed, user } = useAuth();

  if (!signed) {
    return <Home />;
  }

  console.log(signed, user);

  return (
    <>
      <div>My Space Media</div>
      <h1>Olá, {user?.name}</h1>
    </>
  );
}
