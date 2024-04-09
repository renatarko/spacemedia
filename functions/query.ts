import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getUserByLinkNameQuery(slug: string) {
  try {
    const query = await getDocs(collection(db, "users"));
    const users = query.docs.map((item) => item.data())
    const user = users.filter((user) => user.linkName === slug)

    if (user.length) return user[0]
    return null
  } catch (error) {
    console.log(error);
  }
}

export async function getUserDataQuery(uid: string) {
  try {
    if (!uid) return;

    const docRef = doc(db, "users", uid!);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const user = docSnap.data();
    return user;
  } catch (error: any) {
    console.log("getUserQuery", error.message);
  }
}

export async function verifyLinkExist(uid: string, url: string | undefined) {
  try {
    const docRef = doc(db, "users", uid!);

    // const linkRef = doc(db, "users", uid);
    // await updateDoc(linkRef, { link: { links: [] } });

    // const querySnapshot = await getDocs(collection(db, "users", uid, "link"));

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.get("link.links");

      return;
    }

    return "doc not exist";
  } catch (error) {
    console.log({ error });
  }
}
