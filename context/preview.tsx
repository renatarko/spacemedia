import { linkProps } from "@/components/link";
import { auth } from "@/config/firebase";
import { getUserDataQuery } from "@/functions/query";
import { User } from "@/types/types";
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
    type: "",
    name: "",
    url: "",
  },
];

const initialValue = {
  title: {
    content: "",
    color: "",
  },
  avatar: "",
  career: {
    content: "",
    color: "",
  },
  nickname: {
    content: "",
    color: "",
  },
};

const colorsInitialValue = {
  background: {},
  title: {},
  career: {},
  nickname: {},
  link: {},
};

type PreviewContextProps = {
  links: linkProps[];
  colors: {
    background: {
      color?: string;
      type?: string;
      direction?: string;
      gradient?: {
        firstColor?: string;
        secondColor?: string;
      };
    };
    title: {
      content?: string;
      size?: string | number;
      weight?: string;
      color?: string;
    };
    career: {
      content?: string;
      size?: string | number;
      weight?: string;
      color?: string;
    };
    nickname: {
      content?: string;
      size?: string | number;
      weight?: string;
      color?: string;
    };
    link: {
      background?: string;
      color?: string;
      size?: string;
      weight?: string;
    };
  };
  userPreview: Pick<User, "avatar" | "career" | "title" | "nickname">;
  setColors: Dispatch<
    SetStateAction<{
      background: {
        color?: string;
        type?: string;
        direction?: string;
        gradient?: {
          firstColor?: string;
          secondColor?: string;
        };
      };
      title: {
        content?: string;
        size?: string | number;
        weight?: string;
        color?: string;
      };
      career: {
        content?: string;
        size?: string | number;
        weight?: string;
        color?: string;
      };
      nickname: {
        content?: string;
        size?: string | number;
        weight?: string;
        color?: string;
      };
      link: {
        background?: string;
        color?: string;
        size?: string;
        weight?: string;
      };
    }>
  >;
  setLinks: Dispatch<SetStateAction<linkProps[]>>;
  setUserPreview: Dispatch<
    SetStateAction<Pick<User, "avatar" | "career" | "title" | "nickname">>
  >;
};

const PreviewContext = createContext({} as PreviewContextProps);

export default function PreviewProvider({ children }: any) {
  const [links, setLinks] = useState<linkProps[]>([] as linkProps[]);
  const [colors, setColors] = useState(colorsInitialValue);
  const [userPreview, setUserPreview] =
    useState<Pick<User, "avatar" | "career" | "title" | "nickname">>(
      initialValue
    );

  const getUser = async () => {
    const uid = auth.currentUser?.uid;
    try {
      const user = await getUserDataQuery(uid!);
      if (!user) return;

      setUserPreview({
        avatar: user.avatar,
        career: { content: user.career },
        nickname: { content: "" },
        title: { content: "" },
      });
      setLinks(user.link.links);
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
