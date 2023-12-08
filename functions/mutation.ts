import { db } from "@/config/firebase";
import { Link, User } from "@/types/types";
import {
  QueryDocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const createUser = async (_user: User, uid: string) => {
  try {
    // const uid = "EGsQ1VqJuEYgRZiKWKJy76w2KmV2";
    const docRef = doc(db, "users", uid);
    // await addDoc(collection(db, "users"))
    // console.log(userDB.firestore);

    const created = await setDoc(
      docRef,
      {
        name: _user.name,
        email: _user.email,
        avatar: _user.avatar,
      },
      { merge: true }
    );
    console.log("User created successfully", created);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function saveLinkNameMutation(uid: string, linkName: string) {
  try {
    const docRef = doc(db, "users", uid!);
    await setDoc(docRef, { linkName: linkName }, { merge: true });
    // await addDoc(collection(db, "users"), { linkName: linkName });
    console.log("link name created successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function AddLinkOnLinksMutation(uid: string, link: Link) {
  const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  });

  try {
    const docRef = doc(db, "users", uid).withConverter(converter<User>());

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) return null;

    await updateDoc(docRef, { links: arrayUnion(link) });

    console.log("link name created successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
