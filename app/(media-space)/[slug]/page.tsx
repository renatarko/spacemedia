import Link, { LinkProps } from "@/components/link";
import { getUserByLinkNameQuery } from "@/functions/query";
import Image from "next/image";

type MediaSpaceProps = {
  params: {
    slug: string;
  };
};

export default async function MediaSpace({
  params: { slug },
}: MediaSpaceProps) {
  const user = await getUserByLinkNameQuery(slug);

  return (
    <main
      className="w-full h-screen flex flex-col justify-center items-center"
      style={{ background: user?.background }}
    >
      <div>
        <Image
          src={user?.avatar}
          alt={`imagem de ${user?.name}`}
          width={200}
          height={200}
        />
        <h1>Links de {user?.name}</h1>

        <div className="flex flex-col items-center z-10 mt-8">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <h2 className="text-xl">{user?.career}</h2>

          <p className="mt-4 text-lg font-bold">@{user?.linkName}</p>
        </div>

        <ul className="flex flex-col gap-4 mt-8 w-full">
          {user?.links?.map((link: LinkProps, i: any) => (
            <Link
              key={i}
              url={link?.url}
              icon={link?.icon}
              background={link.background}
              color={link.color}
            >
              {link.children}
            </Link>
          ))}
        </ul>
      </div>

      <p className="text-blue-500 font-bold m-2 bottom-0 text-sm mt-12">
        media space
      </p>
    </main>
  );
}
