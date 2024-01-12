import LinkName from "@/components/linkName";
import PhonePreview from "@/components/phonePreview";
import { getUserDataQuery } from "@/functions/query";
import { cookies } from "next/headers";

export default async function PreviewPage() {
  const cookiesStore = cookies();
  const cookieUID = cookiesStore.get(process.env.NEXT_PUBLIC_COOKIE_UID!);
  // let uid: string;
  if (cookieUID !== undefined) {
    // uid = (cookieUID as RequestCookie).value;
  }

  console.log({ cookieUID });
  const uid = "pc1L66IOBDNViKBZjWA5LsPDIVi2";

  const user = await getUserDataQuery(uid!);

  return (
    <aside className="h-full md:px-12 px-1 flex flex-col items-center w-full max-w-xl">
      <LinkName linkNameSaved={user?.linkName} />

      <PhonePreview data={user} />
    </aside>
  );
}
