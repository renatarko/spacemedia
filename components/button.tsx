import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: string;
  icon?: ReactNode;
  isAnchor: boolean;
  path?: string;
  minWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  icon,
  isAnchor = false,
  path,
  minWidth,
  ...props
}: ButtonProps) {
  if (isAnchor) {
    return (
      <Link
        href={path!}
        className={`py-2 disabled:bg-blue-100 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer font-semibold px-5 text-lg text-black bg-blue-400 flex items-center gap-2 rounded-full relative overflow-hidden left-0 right-0 before:z-0 hover:before:scale-[4.8] before:duration-200 before:w-12 before:h-12 before:rounded-full before:absolute before:scale-0 before:bg-blue-800 before:opacity-0 hover:before:opacity-100  hover:text-blue-500 ${
          minWidth && "max-w-max"
        }`}
      >
        <span className="z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      className={`py-2 disabled:bg-blue-100 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer font-semibold px-5 text-lg text-black bg-blue-400 flex items-center gap-2 rounded-full relative overflow-hidden left-0 right-0 before:z-0 hover:before:scale-[4.8] before:duration-200 before:w-12 before:h-12 before:rounded-full before:absolute before:scale-0 before:bg-blue-800 before:opacity-0 hover:before:opacity-100 hover:text-blue-500 ${
        minWidth && "max-w-max"
      }`}
      {...props}
    >
      {icon && <i className="z-10">{icon}</i>}
      <span className="z-10">{children}</span>
    </button>
  );
}
