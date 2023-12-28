import { auth } from "@/config/firebase";
import { getUserDataQuery } from "@/functions/query";
import { Link, User } from "@/types/types";
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

  const getUser = async () => {
    const uid = auth.currentUser?.uid;
    console.log(uid);
    try {
      const user = await getUserDataQuery(uid!);
      console.log({ user });
      if (!user) return;

      // setColors({
      //   ...colors,
      //   background:
      //     user.background.type === "gradient"
      //       ? user.background.gradient
      //       : user.background.color,
      // });

      setUserPreview({
        avatar: user.avatar,
        career: user.career,
        nickname: user.nickname,
        title: user.title,
        link: user.link,
      });
      setColors({
        ...colors,
        // title: {size: user.title.size, color: user.title.size, weight: user.title.weight} ,
        background: user.background,
        title: user.title,
        career: user.career,
        nickname: user.nickname,
        link: user.link,
      });
      setLinks(user.link.links);
    } catch (error) {
      console.log(error);
    }
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
