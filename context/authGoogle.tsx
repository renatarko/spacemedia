"use client";

import { auth } from "@/config/firebase";
import { localStorageAuth, routesApp } from "@/functions/constant";
import { createUser } from "@/functions/mutation";
import { UserContext } from "@/types/types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();

export type AuthContext = {
  user: UserContext | null | undefined;
  loginWithGoogle: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  signUpWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  notify: (message: string) => void;
  signed: boolean;
};

export const AuthGoogleContext = createContext({} as AuthContext);

export const AuthGoogleProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserContext | null>(null);
  const [signed, setSigned] = useState(false);

  const router = useRouter();

  const setUserState = (auth_user: UserContext) => {
    setUser({
      name: auth_user.name,
      email: auth_user.email,
      avatar: auth_user.avatar,
    });
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userAuth = result.user;
      const uid = userAuth.uid;

      await setCookie(token!, uid);

      setUser({
        name: userAuth.displayName!,
        email: userAuth.email!,
        avatar: userAuth.photoURL!,
      });

      const auth_user = {
        name: userAuth.displayName!,
        email: userAuth.email!,
        avatar: userAuth.photoURL!,
      };

      await createUser(auth_user, uid);
      redirectUserAuth(uid);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      toast.error(errorCode);
    }
  };

  const setCookie = async (token: string, uid: string) => {
    try {
      await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, uid: uid }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const credential = result;
      const user = credential.user;
      const token = await user.getIdToken();

      await setCookie(token!, user.uid);

      const auth_user = {
        name: user.displayName!,
        email: user.email!,
        avatar: user.photoURL,
      };

      // setUserState(auth_user);
      // redirectUserAuth(auth_user);
      redirectUserAuth(user.uid);
      alert("user logged with email and password");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  const signUpWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const credential = result;
      const user = credential.user;
      const token = await user.getIdToken();

      const auth_user = {
        name,
        email: user.email!,
        avatar: user.photoURL!,
      };

      setUserState(auth_user);
      redirectUserAuth(user.uid);
      await createUser(auth_user, user.uid);
    } catch (error: any) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const logout = async () => {
    try {
      router.push("/");
      await signOut(auth);
      setUser(() => null);
      await fetch("/api/auth", { method: "DELETE" });
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const redirectUserAuth = (uid: string) => {
    if (!uid) return;

    router.push(
      `${routesApp.private.my_media}?tab=${routesApp.private.tabs.profile}`
    );
  };

  const notify = (message: string) => toast(message);

  const getCookie = async () => {
    const data = await fetch("/api/auth");
    const result: string = await data.json();
    if (!result) {
      setSigned(false);
      return;
    }
    setSigned(true);
  };

  useEffect(() => {
    getCookie();
  }, []);

  return (
    <AuthGoogleContext.Provider
      value={{
        loginWithGoogle,
        loginWithEmailAndPassword,
        signUpWithEmailAndPassword,
        logout,
        user,
        signed,
        notify,
      }}
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
