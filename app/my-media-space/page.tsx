// type MySpaceMediaProps = {
//   params: {
//     slug: string;
//   };
// };

import Profile from "@/components/profile";
import { getUserDataQuery } from "@/functions/query";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export default async function MySpaceMedia() {
  const cookiesStore = cookies();
  const cookieUID = cookiesStore.get(process.env.NEXT_PUBLIC_COOKIE_UID!);
  let uid: string;
  if (cookieUID !== undefined) {
    uid = (cookieUID as RequestCookie).value;
  }
  const user = await getUserDataQuery(uid!);

  return (
    <>
      {!user && null}
      {user && <Profile userRef={user} />}
    </>
  );
}
