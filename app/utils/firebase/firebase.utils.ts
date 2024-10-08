import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
  collection,
  writeBatch,
  getDocs,
  query,
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

// Ensure that Firebase Auth persists the session across page reloads and tabs
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to browserLocalPersistence");
  })
  .catch((error) => {
    console.error("Failed to set persistence:", error);
  });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: any[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });

  await batch.commit();
  console.log("Data added successfully");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryList: { [key: string]: any } = querySnapshot.docs.reduce(
    (acc: { [key: string]: any }, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );
  return categoryList;
};

// Fetch products by category from Firestore
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  images: string[];
  price: number;
  discountPrice?: number;
  description: string;
  reviews: number;
}

interface CategoryData {
  title: string;
  items: Product[];
}

export const fetchCategoryProducts = async (
  category: string
): Promise<Product[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error(`No documents found for category: ${category}`);
    return [];
  }

  let categoryData: CategoryData | null = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data() as CategoryData;
    if (data.title.toLowerCase() === category.toLowerCase()) {
      categoryData = data;
    }
  });

  if (!categoryData) {
    console.error(`Category "${category}" not found.`);
    return [];
  }

  console.log("Category Data:", categoryData);
  return (categoryData as CategoryData)?.items ?? [];
};

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
  additionalInformation: AdditionalInformation = {}
): Promise<DocumentReference | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const displayName =
      userAuth.displayName ?? additionalInformation.displayName;
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
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
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmailAndPasswordHandler = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log("Error signing in", (error as Error).message);
    throw error;
  }
};

// Listen for auth state changes and run a callback when the user signs in or out
export const onAuthStateChangeListener = (
  callback: (user: User | null) => void
) => {
  onAuthStateChanged(auth, callback);
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  const roleDocRef = doc(db, "roles", userId);
  const roleSnapshot = await getDoc(roleDocRef);
  return roleSnapshot.exists() && roleSnapshot.data()?.role === "admin";
};
