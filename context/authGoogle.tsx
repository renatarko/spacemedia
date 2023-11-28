"use client";

import { auth } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const provider = new GoogleAuthProvider();

type User = {
  name: string;
  email: string;
  avatar: string;
};

export type AuthContext = {
  user: User | null;
  signWithGoogle: () => void;
  signed: boolean;
};

export const AuthGoogleContext = createContext({} as AuthContext);

export const AuthGoogleProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ name: "", email: "", avatar: "" });
  const router = useRouter();

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const userAuth = result.user;

        setUser({
          name: userAuth.displayName!,
          email: userAuth.email!,
          avatar: userAuth.photoURL!,
        });

        localStorage.setItem("@Auth:token", token!);
        redirectUserAuth(userAuth);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const redirectUserAuth = (user: any) => {
    if (user) {
      router.push("/my-space-media");
    }

    return;
  };

  return (
    <AuthGoogleContext.Provider
      value={{ signWithGoogle, user, signed: !!user }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthGoogleContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthGoogleProvider");
  }

  return context;
}
