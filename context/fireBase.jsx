import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth  , createUserWithEmailAndPassword , signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup , onAuthStateChanged , signOut} from "firebase/auth";
import {getFirestore , collection , addDoc , getDocs , getDoc , doc , query , where, Firestore} from "firebase/firestore";
import { getStorage , ref , uploadBytes , getDownloadURL} from "firebase/storage";


const FireBaseContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FireBaseContext);
export default function FirebaseProvider(props) {

  const [user, setUser] = useState(null);

  const signupUserWithEmailAndPassword = (email , password) => {
     return createUserWithEmailAndPassword(firebaseAuth , email , password);
  }

  const signinUserWithEmailAndPassword = (email , password) => {
    return signInWithEmailAndPassword(firebaseAuth , email , password);
  }

  const signInWithGoogle = () => signInWithPopup(firebaseAuth , googleProvider);

  const signOutUser = () => signOut(firebaseAuth);

  const handleNewListing = async (name , imbn , price , imageUrl) => {
    // const imageRef = ref(firebaseStorage , `uploads/images/${Date.now()}-${file.name}`);
    // const uploadResult = await uploadBytes(imageRef , file);
    // const imageUrl = uploadResult.metadata.fullPath;

    // Save book details to Firestore

    const displayName = user.displayName  ? user.displayName : user.email.split("@")[0];
    return await addDoc(collection(fireStore , "books") , {
      name,
      imbn,
      price,
      imageUrl,
      userId : user?.uid,
      userEmail : user?.email,
      displayName : displayName,
      photoURL : user?.photoURL
    });
  }

  const getAllListings = async () => {
    return await getDocs(collection(fireStore , "books"));
  }

  const getDownloadURL = async (imagePath) => {
    return await getDownloadURL(ref(firebaseStorage , imagePath));
  }

  const getBookById = async (bookId) => {
    const docRef = doc(fireStore , "books" , bookId);
    const result = await getDoc(docRef);
    return result;
  }

  const placeOrder = async (bookId , qty , bookName , bookPrice , bookAuthor) => {
    const docsRef = collection(fireStore , "orders");
    const displayName = user.displayName  ? user.displayName : user.email.split("@")[0];
    const result = await addDoc(docsRef , {
      bookId,
      bookName,
      bookPrice : Number(bookPrice * qty),
      userEmail : user?.email,
      displayName : displayName,
      qty : Number(qty),
      bookAuthor,
      orderDate : new Date()
    });
    return result;
  }

  const getOrdersByAuthorEmail= async () => {
    const collectionRef = collection(fireStore , "orders");
    const q = query(collectionRef , where("bookAuthor" , "==" , user?.email));
    return await getDocs(q);
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth , (currentUser) => {
      if(currentUser) setUser(currentUser)
        else setUser(null);
    })
  } , []);

  const isLoggedIn = user ? true : false;

  return (
    <FireBaseContext.Provider value={{ signupUserWithEmailAndPassword , signinUserWithEmailAndPassword , signInWithGoogle , isLoggedIn , signOutUser , handleNewListing , getAllListings , getDownloadURL , getBookById ,  placeOrder , user , getOrdersByAuthorEmail }}>
      {props.children}
    </FireBaseContext.Provider>
  );
}
