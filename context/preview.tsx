import { LinkProps } from "@/components/link";
import { Instagram } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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

type PreviewContextProps = {
  title: string;
  subtitle: string;
  career: string;
  image: string;
  links: LinkProps[];
  colors: { color: string; background: string; bg: string };
  setColors: Dispatch<
    SetStateAction<{ color: string; background: string; bg: string }>
  >;
  setTitle: Dispatch<SetStateAction<string>>;
  setSubtitle: Dispatch<SetStateAction<string>>;
  setCareer: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<string>>;
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
};

const PreviewContext = createContext({} as PreviewContextProps);

export default function PreviewProvider({ children }: any) {
  const [title, setTitle] = useState("Renata Karolina");
  const [subtitle, setSubtitle] = useState("renata_rko");
  const [career, setCareer] = useState("Software Developer");
  const [image, setImage] = useState("/image.png");
  const [links, setLinks] = useState(LINKS);
  const [colors, setColors] = useState({
    color: "#000",
    background: "#c3cef6ed",
    bg: "#ffff",
  });

  return (
    <PreviewContext.Provider
      value={{
        title,
        setTitle,
        subtitle,
        setSubtitle,
        career,
        setCareer,
        image,
        setImage,
        links,
        setLinks,
        colors,
        setColors,
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
