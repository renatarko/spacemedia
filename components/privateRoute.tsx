"use client";

import { auth } from "@/config/firebase";
import { routesApp } from "@/functions/constant";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  const checkUserAuthenticate = () => {
    if (typeof window !== "undefined") {
      const userAuth = auth.currentUser?.uid !== null;
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
      {!isUserAuthenticated && null}
      {/* <Base>
        <Container>
          <div className="grid grid-cols-2 gap-4">
            <ProfileSkeleton />
            <PhoneSkeleton />
          </div>
        </Container>
        //{" "}
      </Base> */}
      {isUserAuthenticated && children}
    </>
  );
}
