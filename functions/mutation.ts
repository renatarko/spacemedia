import { db } from "@/config/firebase";
import { Link, User, UserContext } from "@/types/types";
import {
  QueryDocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const createUser = async (_user: UserContext, uid: string) => {
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
    await setDoc(docRef, { "linkName.content": linkName });
    // await addDoc(collection(db, "users"), { linkName: linkName });
    console.log("link name created successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function saveAvatarMutation(uid: string, _avatar: string) {
  try {
    const docRef = doc(db, "users", uid!);
    await setDoc(docRef, { avatar: _avatar }, { merge: true });
    // await addDoc(collection(db, "users"), { linkName: linkName });
    console.log("avatar added successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteImageAvatarMutation(uid: string) {
  try {
    const docRef = doc(db, "users", uid!).withConverter(converter<User>());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) return null;
    await updateDoc(docRef, { avatar: "" });
  } catch (error) {
    console.log(error);
  }
}

export async function AddLinkOnLinksMutation(uid: string, link: Link) {
  try {
    const docRef = doc(db, "users", uid).withConverter(converter<User>());

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) return null;

    // await updateDoc(docRef, { links: arrayUnion(link) });

    await updateDoc(docRef, {
      "link.links": arrayUnion(link),
    });

    console.log("link created successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
