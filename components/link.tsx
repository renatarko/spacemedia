import { usePreview } from "@/context/preview";

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
  background?: string;
  color?: string;
  link: {
    type: string;
    name: string;
    url: string;
    icon?: string;
  };
};

export default function Link({ link, background, color }: linkProps) {
  const { colors } = usePreview();
  return (
    <a
      className={`w-full group flex items-center gap-2 p-3 rounded-lg hover:shadow-md duration-150 
        `}
      style={{ background: background, color: color ? color : "#000" }}
      target="_blank"
      href={link?.url ? link.url : "/"}
    >
      {link?.icon && (
        <span
          className="group-hover:scale-105 duration-200"
          style={{ color: color }}
        >
          {link?.icon}
        </span>
      )}
      {link?.name}
    </a>
  );
}
