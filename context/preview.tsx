import { getUserDataQuery } from "@/functions/query";
import { Link, User } from "@/types/types";
import { DocumentData } from "@firebase/firestore";
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
  link: {},
};

const colorsInitialValue = {
  background: {},
  title: {},
  career: {},
  nickname: {},
  link: {},
};

type PreviewContextProps = {
  links: Link[];
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
  userPreview: Pick<User, "avatar" | "career" | "title" | "nickname" | "link">;
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
  setLinks: Dispatch<SetStateAction<Link[]>>;
  setUserPreview: Dispatch<
    SetStateAction<
      Pick<User, "avatar" | "career" | "title" | "nickname" | "link">
    >
  >;
};

const PreviewContext = createContext({} as PreviewContextProps);

export default function PreviewProvider({ children }: any) {
  const [links, setLinks] = useState<Link[]>([] as Link[]);
  const [colors, setColors] = useState(colorsInitialValue);
  const [userPreview, setUserPreview] =
    useState<Pick<User, "avatar" | "career" | "title" | "nickname" | "link">>(
      initialValue
    );

  const getUserUID = async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth`, {
        // mode: "no-cors",
        // referrerPolicy: "",
        method: "GET",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin":
            "http://localhost:3000, https://spacemedia.vercel.app/",
        },
      });
      return await data.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { uid } = await getUserUID();
      const user = await getUserDataQuery(uid!);
      if (!user) return;

      setUserAndColors(user);
    } catch (error) {
      console.log(error);
    }
  };

  function setUserAndColors(user: DocumentData) {
    setUserPreview({
      avatar: user.avatar,
      career: user.career,
      nickname: user.nickname,
      title: user.title,
      link: user.link,
    });
    setColors({
      ...colors,
      ...user,
      title: user.title,
      career: user.career,
      nickname: user.nickname,
      link: user.link,
    });
    setLinks(user.link.links);
  }

  const isUndefined = Object.values(userPreview)[0];

  useEffect(() => {
    getUser();
  }, [!!isUndefined]);

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
