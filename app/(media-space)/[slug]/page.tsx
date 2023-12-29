import PhonePreview from "@/components/phonePreview";
import { getUserByLinkNameQuery } from "@/functions/query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type MediaSpaceProps = {
  params: {
    slug: string;
  };
};

export default async function MediaSpace({
  params: { slug },
}: MediaSpaceProps) {
  const user = await getUserByLinkNameQuery(slug);

  const gradient = `linear-gradient(to ${user?.background.direction}, ${user?.background.gradient.firstColor}, ${user?.background.gradient.secondColor})`;
  console.log("pagina de ver", user?.background);
  return (
    <>
      <main
        className={`h-screen w-full flex flex-col justify-center items-center relative`}
        style={{
          background:
            user?.background.type === "gradient" ? gradient : user?.color,
        }}
      >
        <Link
          href={"/my-media-space"}
          className="absolute flex gap-1 top-0 left-0 m-6 text-white p-2 hover:shadow-md rounded-full backdrop-blur-md bg-white/5"
        >
          <ChevronLeft />
          Back
        </Link>

        <PhonePreview data={user} />
      </main>
    </>
  );
}
