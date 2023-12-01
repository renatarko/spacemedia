export type LinkProps = {
  children: string;
  background: string;
  color: string;
  icon: React.ReactNode | any;
  path: string;
};

export default function Link({
  children,
  icon,
  path,
  background,
  color,
}: LinkProps) {
  return (
    <a
      className={`w-full group flex items-center gap-2 p-3 text-gray-900 rounded-lg hover:shadow-md duration-150 ${
        !background && "bg-white" && !color && "text-black"
      }
        `}
      style={{ background: background, color: color }}
      target="_blank"
      href={path}
    >
      {icon && (
        <span
          className="group-hover:scale-105 duration-200"
          style={{ color: color }}
        >
          {icon}
        </span>
      )}
      {children}
    </a>
  );
}
