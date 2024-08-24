import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
} from "firebase/firestore";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

interface UserAuth extends User {
  displayName: string | null;
  email: string | null;
}

interface AdditionalInformation {
  displayName?: string;
}

// Create a user document from auth with optional additional information
export const createUserDocumentFromAuth = async (
  userAuth: UserAuth | null,
  additionalInformation: AdditionalInformation = {} // Defaults to an empty object
): Promise<DocumentReference | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // Use displayName from userAuth if available, else fallback to additionalInformation
    const displayName =
      userAuth.displayName ?? additionalInformation.displayName;
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // Merge any additional information, though in this case it's only displayName
      });
    } catch (error) {
      console.log("Error creating user", (error as Error).message);
    }
  }

  return userDocRef;
};

// Create a user with email and password
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // After creating the user with email and password, save the display name to Firestore
    await createUserDocumentFromAuth(user, { displayName });

    return userCredential;
  } catch (error) {
    console.log("Error creating user", (error as Error).message);
    // Re-throw the error so it can be caught in the calling function
    throw error;
  }
};