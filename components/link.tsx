import { useState } from "react";

export type LinkProps = {
  children?: string;
  background?: string;
  color?: string;
  icon?: React.ReactNode | any;
  type?: string;
  name?: string;
  url?: string;
};

export type linkProps = {
  design: {
    background?: string;
    color?: string;
    weight?: string;
    size?: string;
  };
  link: {
    type?: string;
    name?: string;
    url?: string;
    icon?: string;
  };
};

export type LinkPropss = {
  link: {
    type: string;
    name: string;
    url: string;
    background?: string;
    color?: string;
    weight?: string;
    size?: string;
    icon?: string;
  };
};

export default function Link({ link, design }: linkProps) {
  const [clicked, setClicked] = useState(false);

  const setPathLink = () => {
    const type = link?.type;

    if (!type || type === undefined) return "#";

    if (type === "instagram") return `https://www.instagram.com/${link?.url}`;
    if (type === "whatsapp")
      return `https://api.whatsapp.com/send?phone=55${link?.url}`;
    if (type === "email") return `mailto:${link?.url}`;
    if (type === "phone") return `tel:${link?.url}`;
    if (type === "link") return link?.url;
    if (type === "facebook") return `https://www.facebook.com/${link.url}`;
  };

  const clickStyle = () => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  return (
    <a
      className={`w-full group flex items-center gap-2 p-3 rounded-lg hover:shadow-md duration-150 ${
        clicked && "animate-click"
      }
        `}
      style={{
        background: design?.background ? design?.background : "#f8f8f8",
        color: design?.color ? design?.color : "#000",
        fontWeight: design?.weight ? design?.weight : "normal",
        fontSize: design?.size ? design?.size + "px" : "16px",
      }}
      target="_blank"
      href={setPathLink()}
      onClick={clickStyle}
    >
      {link?.icon && (
        <span
          className="group-hover:scale-105 duration-200"
          style={{ color: design?.color }}
        >
          {link?.icon}
        </span>
      )}
      {link?.name}
    </a>
  );
}
