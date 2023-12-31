import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getUserByLinkNameQuery(slug: string) {
  const uid = "pc1L66IOBDNViKBZjWA5LsPDIVi2";
  try {
    const query = await getDocs(collection(db, "users"));

    const linkNameBySlug = query.docs
      .map((item) => item.data())
      .map((item) => item)
      .filter((user) => user.linkName?.content === slug);
    // console.log(quey.docs.map((item) => item.data()));
    // const userRef = collection(db, "users");
    // const user = query(userRef, where("linkName", "array-contains", slug));
    // const queryGet = await getDocs(user)
    return linkNameBySlug[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getUserDataQuery(uid: string) {
  try {
    const docRef = doc(db, "users", uid!);
    const docSnap = await getDoc(docRef);
    console.log({ docSnap });

    if (!docSnap.exists()) return;

    const user = docSnap.data();
    return user;
  } catch (error) {
    console.log("getUserQuery", { error });
  }
}
