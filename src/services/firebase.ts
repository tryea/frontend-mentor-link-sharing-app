import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-4JoKXczpLJCMvChUF49uE2pLqz_sXo8",
  authDomain: "link-sharing-app-20ee8.firebaseapp.com",
  projectId: "link-sharing-app-20ee8",
  storageBucket: "link-sharing-app-20ee8.appspot.com",
  messagingSenderId: "989246849978",
  appId: "1:989246849978:web:2d1046a4df414a5f811383",
  measurementId: "G-G2H8Q8XMYW",
};

// Connect to your Firebase app
const app = initializeApp(firebaseConfig);
// Connect to your Firestore database
const db = getFirestore(app);
// Connect to Firebase auth
const auth = getAuth(app);

export async function findUserLinks(userId: string) {
  try {
    const docRef = query(
      collection(db, "userLinks"),
      where("user_id", "==", userId)
    );

    const userLinksDocSnap = await getDocs(docRef);

    return userLinksDocSnap.docs;
  } catch (err: any) {
    console.log("error at findUserLinks");
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}

export type TFirebaseLinkFormData = {
  platform: string;
  url: string;
  user_id: string;
};

export async function addUserLinks(
  firebaseToken: string,
  index: number,
  formData: TFirebaseLinkFormData
) {
  try {
    const userCredentials = await signInWithCustomToken(auth, firebaseToken);

    const docRef = collection(db, "userLinks");

    const userLinksDocSnap = await addDoc(docRef, formData);

    return { doc: userLinksDocSnap, index };
  } catch (err: any) {
    console.log(err);
    throw err;
  }
}

export async function updateUserLinks(
  firebaseToken: string,
  index: number,
  documentId: string,
  formData: TFirebaseLinkFormData
) {
  try {
    const userCredentials = await signInWithCustomToken(auth, firebaseToken);

    const currentDocumentRef = doc(db, "userLinks", documentId);

    const userLinksDocSnap = await updateDoc(currentDocumentRef, formData);

    return;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
}

export async function getUserIdFromUsername(username: string) {
  try {
    const docRef = query(
      collection(db, "userData"),
      where("username", "==", username)
    );

    const userDataDocSnap = await getDocs(docRef);
    console.log({ userDataDocSnap: userDataDocSnap.docs });

    const user_id = userDataDocSnap.docs[0]?.data().user_id;

    return user_id;
  } catch (err: any) {
    console.log("error at getUserIdFromUsername");
    console.log(JSON.stringify(err, null, 2));

    throw err;
  }
}
