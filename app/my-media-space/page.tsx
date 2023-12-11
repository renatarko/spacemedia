// type MySpaceMediaProps = {
//   params: {
//     slug: string;
//   };
// };

import PhonePreview from "@/components/phonePreview";
import Profile from "@/components/profile";
import { getUserDataQuery } from "@/functions/query";

export default async function MySpaceMedia() {
  const uid = "pc1L66IOBDNViKBZjWA5LsPDIVi2";
  const user = await getUserDataQuery(uid);
  return (
    <>
      {/* <Container> */}
      {/* <div className="w-full justify-between flex mt-4 items-center">
        <LinkName linkNameSaved="renata_rko" />
        <h1 className="text-blue-500">My Media Space</h1>
      </div> */}
      {/* <main className="mt-16 relative w-full mb-8 grid md:grid-cols-2 grid-cols-1 gap-4"> */}
      <Profile userRef={user} />

      <PhonePreview data={user} />
      {/* <Phone data={user} /> */}
      {/* </main> */}
      {/* </Container> */}
    </>
  );
}
