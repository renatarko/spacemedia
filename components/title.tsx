type TextProps = {
  title?: string;
  titleContrast?: string;
  subtitle?: string;
  subtitleContrast?: string;
};

export default function Text({
  title,
  titleContrast,
  subtitle,
  subtitleContrast,
}: TextProps) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-4 z-10">
        {title}{" "}
        <span className="relative before:w-full before:z-[-1] before:bottom-0 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
          {titleContrast}
        </span>
      </h1>
      <h2 className="text-4xl mt-8 mb-8 font-bold">
        {subtitle}{" "}
        <span className="relative before:w-full before:z-[-1] before:bottom-0 before:absolute before:bg-[#56B3C8]/60 before:left-0 before:h-4">
          {subtitleContrast}
        </span>
      </h2>
    </div>
  );
}
