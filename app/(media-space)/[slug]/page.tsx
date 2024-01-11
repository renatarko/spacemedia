import PhonePreview from "@/components/phonePreview";
import { getUserByLinkNameQuery } from "@/functions/query";

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

  return (
    <>
      <h1>ooi babaca</h1>
      <section
        className={`h-screen w-full flex flex-col justify-center items-center relative`}
        style={{
          background:
            user?.background.type === "gradient" ? gradient : user?.color,
        }}
      >
        <PhonePreview data={user} />

        <a
          href="https://spacemedia.vercel.app/"
          target="_blank"
          className="absolute m-3 bottom-0 mt-12 font-bold"
          style={{ color: user?.title.color || "#ffff" }}
        >
          media space
        </a>
      </section>
    </>
  );
}
