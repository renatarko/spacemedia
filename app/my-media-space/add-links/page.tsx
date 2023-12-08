import AddLink from "@/components/addLink";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getLinks() {
  try {
    const quey = await getDocs(collection(db, "users"));

    const linkNameBySlug = quey.docs
      .map((item) => item.data())
      .filter((item) => item.name === "Renata K.");

    return linkNameBySlug[0].links;
    // console.log(quey.docs.map((item) => item.data()));
    // const userRef = collection(db, "users");
    // const user = query(userRef, where("linkName", "array-contains", slug));
    // const queryGet = await getDocs(user)
    // return linkNameBySlug[0];
    // console.log(queryGet.query.firestore);
  } catch (error) {
    console.log(error);
  }
}
export default async function AddLinksPage() {
  // const links: Links = await getLinks();
  // console.log(links);
  return (
    <>
      <AddLink />
      {/* {links?.map((link, i) => (
          <div key={i}>
            {link?.name}
            <p>{link?.type}</p>

            <p>{link?.url}</p>
          </div>
        ))} */}
    </>
  );
}
