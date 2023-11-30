import { db } from "@/config/firebase";
import { UserContext } from "@/types/user";
import { addDoc, collection } from "firebase/firestore";

export const createUser = async (_user: UserContext) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: _user.name,
      email: _user.email,
      avatar: _user.avatar,
    });
    console.log("User created successfully", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
