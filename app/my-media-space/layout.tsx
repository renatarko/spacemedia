"use client";

import { useAuth } from "@/context/authGoogle";
import { useRouter } from "next/navigation";
import React from "react";

type MyMediaSpaceLayoutProps = {
  children: React.ReactNode;
};

export default function MyMediaSpaceLayout({
  children,
}: MyMediaSpaceLayoutProps) {
  const router = useRouter();
  const { signed, notify } = useAuth();

  if (signed) {
    return <h1>hello, Welcome</h1>;
  }

  if (!signed) {
    router.push("/");
    notify("Clique em entrar para fazer login.");
  }

  return (
    <div className="mt-36">
      My Media Space - Layout
      {children}
    </div>
  );
}
