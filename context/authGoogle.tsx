"use client";

import { auth } from "@/config/firebase";
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

const LOCAL_AUTH_TOKEN = "@Auth:token";
const LOCAL_AUTH_USER = "@Auth:user";

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
    localStorage.setItem(LOCAL_AUTH_TOKEN, token!);
    localStorage.setItem(LOCAL_AUTH_USER, JSON.stringify(auth_user));
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userAuth = result.user;
      const uid = userAuth.uid;
      console.log(credential?.signInMethod);
      console.log({ result, credential, token });
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
      redirectUserAuth(auth_user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      toast.error(errorCode);
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const credential = result;
      const user = credential.user;
      const token = await user.getIdToken();

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

  const redirectUserAuth = (user: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    if (user) {
      router.push(`/my-media-space`);
    }

    return;
  };

  const notify = (message: string) => toast(message);

  useEffect(() => {
    const localStore = localStorage.getItem("@Auth:user");
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
