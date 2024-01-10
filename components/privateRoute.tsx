"use client";

import { localStorageAuth, routesApp } from "@/functions/constant";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import PhoneSkeleton from "./Skeletons/phone";
import ProfileSkeleton from "./Skeletons/profile";
import Container from "./container";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  const checkUserAuthenticate = () => {
    if (typeof window !== "undefined") {
      const userAuth = localStorage.getItem(localStorageAuth.token);
      return !!userAuth;
    }
    return false;
  };

  const isUserAuthenticated = checkUserAuthenticate();

  useEffect(() => {
    if (!isUserAuthenticated) {
      toast.error("Log in to continue", {
        style: { background: "rgb(234, 179, 8)", color: "black" },
      });
      router.push(routesApp.public.home);
    }
  }, [isUserAuthenticated, router]);

  return (
    <>
      {!isUserAuthenticated && (
        // <Base>
        <Container>
          <div className="grid grid-cols-2 gap-4">
            <ProfileSkeleton />
            <PhoneSkeleton />
          </div>
        </Container>
        // </Base>
      )}
      {isUserAuthenticated && children}
    </>
  );
}
