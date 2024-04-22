import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
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

export async function findUserLinks(firebaseToken: string, userId: string) {
  try {
    const userCredentials = await signInWithCustomToken(auth, firebaseToken);

    const docRef = query(
      collection(db, "userLinks"),
      where("uid", "==", userId)
    );

    const userLinksDocSnap = await getDocs(docRef);

    return userLinksDocSnap.docs;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
}
