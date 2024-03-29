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
  // const router = useRouter();

  const cookiesStore = cookies();
  const cookieUID = cookiesStore.get(process.env.NEXT_PUBLIC_COOKIE_UID!);
  let uid: string;
  if (cookieUID !== undefined) {
    uid = (cookieUID as RequestCookie).value;
  }
  // const uid = "pc1L66IOBDNViKBZjWA5LsPDIVi2";
  const user = await getUserDataQuery(uid!);

  const isUser = user;

  // if (!isUser) {
  //   router.push(routesApp.public.home);
  // }

  return (
    <>
      {!isUser && null}
      {isUser && <Profile userRef={user} />}
    </>
  );
}
