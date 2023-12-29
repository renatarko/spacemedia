import Appearance from "@/components/appearance";
import PhonePreview from "@/components/phonePreview";
import { getUserByLinkNameQuery } from "@/functions/query";

export default async function AppearancePage() {
  const linkname = { content: "renata-developer-1" };
  const user = await getUserByLinkNameQuery(linkname.content);

  return (
    <>
      <div className="flex flex-col customScrollNav gap-12 overflow-y-auto md:px-12 px-1 h:[35rem] sm:h-[50rem] mt-8 divide pb-6 divide-y-2 divide-gray-400/20">
        <Appearance />
      </div>
      <PhonePreview data={user} />
    </>
  );
}
