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

  const router = useRouter();

  const setUserState = (auth_user: UserContext) => {
    setUser({
      name: auth_user.name,
      email: auth_user.email,
      avatar: auth_user.avatar,
    });
  };

  const setUserInLocalStorage = (auth_user: UserContext, token: string) => {
    localStorage.setItem(localStorageAuth.token, token!);
    localStorage.setItem(localStorageAuth.user, JSON.stringify(auth_user));
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

      setUserInLocalStorage(auth_user, token!);
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`, {
        method: "POST",
        headers: {
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
      // setUserInLocalStorage(auth_user, token);
      // redirectUserAuth(auth_user);

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
        // links: [],
      };

      setUserState(auth_user);
      setUserInLocalStorage(auth_user, token);
      await createUser(auth_user, user.uid);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setUser(() => null);
      router.push("/");
    } catch (error: any) {
      const errorCode = error.code;
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

  useEffect(() => {
    const localStore = localStorage.getItem(localStorageAuth.user);
    const isUser = JSON.parse(localStore!);

    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <AuthGoogleContext.Provider
      value={{
        loginWithGoogle,
        loginWithEmailAndPassword,
        signUpWithEmailAndPassword,
        logout,
        user,
        signed: user !== null,
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
