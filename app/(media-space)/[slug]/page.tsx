import PhonePreview from "@/components/phonePreview";
import { getUserByLinkNameQuery } from "@/functions/query";
import { MoveLeft } from "lucide-react";
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

  return (
    <>
      <main
        className="h-screen flex flex-col justify-center items-center relative"
        style={{ background: user?.background }}
      >
        <Link
          href={"/my-media-space"}
          className="absolute flex gap-1 top-0 left-0 m-6 text-white p-1 rounded-full backdrop-blur-md bg-white/5"
        >
          <MoveLeft />
          Back
        </Link>

        <PhonePreview data={user} />
      </main>
    </>
  );
}
