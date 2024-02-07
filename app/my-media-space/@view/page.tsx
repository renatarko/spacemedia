import PhonePreview from "@/components/phonePreview";
import { getUserDataQuery } from "@/functions/query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export default async function ViewPage() {
  const cookiesStore = cookies();
  const cookieUID = cookiesStore.get(process.env.NEXT_PUBLIC_COOKIE_UID!);
  let uid: string;
  if (cookieUID !== undefined) {
    uid = (cookieUID as RequestCookie).value;
  }

  const user = await getUserDataQuery(uid!);
  const gradient = `linear-gradient(to ${user?.background?.direction}, ${user?.background?.gradient?.firstColor}, ${user?.background?.gradient?.secondColor})`;

  return (
    <div
      className={`h-screen w-full flex flex-col justify-center items-center relative`}
      style={{
        background:
          user?.background?.type === "gradient" ? gradient : user?.color,
      }}
    >
      <div className="w-full max-w-xl sm:px-4 flex justify-center">
        <PhonePreview data={user} />
      </div>
    </div>
  );
}
