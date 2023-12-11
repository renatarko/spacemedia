import { LinkProps } from "@/components/link";
import { auth } from "@/config/firebase";
import { getUserDataQuery } from "@/functions/query";
import { User } from "@/types/types";
import { Instagram } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LINKS = [
  {
    children: "Instagram",
    background: "",
    color: "",
    icon: <Instagram />,
    path: "instagram",
  },
];

const initialValue = {
  title: "",
  avatar: "",
  career: "",
  nickname: "",
};

type PreviewContextProps = {
  links: LinkProps[];
  colors: { color: string; background: string; bg: string };
  userPreview: Omit<User, "name" | "links" | "email">;
  setColors: Dispatch<
    SetStateAction<{ color: string; background: string; bg: string }>
  >;
  setLinks: Dispatch<
    SetStateAction<
      {
        children: string;
        background: string;
        color: string;
        icon: JSX.Element;
        path: string;
      }[]
    >
  >;
  setUserPreview: Dispatch<
    SetStateAction<Omit<User, "name" | "links" | "email">>
  >;
};

const PreviewContext = createContext({} as PreviewContextProps);

export default function PreviewProvider({ children }: any) {
  const [links, setLinks] = useState(LINKS);
  const [colors, setColors] = useState({
    color: "#000",
    background: "#c3cef6ed",
    bg: "#ffff",
  });
  const [userPreview, setUserPreview] =
    useState<Omit<User, "name" | "links" | "email">>(initialValue);

  const getUser = async () => {
    const uid = auth.currentUser?.uid;
    try {
      const user = await getUserDataQuery(uid!);
      if (!user) return;

      setUserPreview({
        avatar: user.avatar,
        career: user.career,
        nickname: "",
        title: "",
      });
      setLinks(user.links);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <PreviewContext.Provider
      value={{
        links,
        setLinks,
        colors,
        setColors,
        userPreview,
        setUserPreview,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }

  return context;
};
