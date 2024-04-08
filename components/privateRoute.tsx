"use client";

import { routesApp } from "@/functions/constant";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "./Spinner";
import Base from "./base";


type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(false)

  const getCookie = async () => {
    const data = await fetch('/api/auth')
    const token = await data.json();
    setCurrentUser(!!token)

    return !!token
  }

  useEffect(() => {
    const fetchData = async () => {
      const isAuth = await getCookie();

      if (!isAuth) {
        toast.error("Please log in to continue", {
          style: { background: "rgb(234, 179, 8)", color: "black" },
        });
        router.push(routesApp.public.home);
      }
    };

    fetchData();
  }, [currentUser, router]);

  return (
    <>
      {!currentUser && (
        <Base>
          <div className="flex justify-center items-center h-full">
            <Spinner color="#0bc2ea" />
          </div>
        </Base>
      )}
      {currentUser && children}
    </>
  )
}
