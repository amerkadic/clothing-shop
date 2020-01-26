import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGa11_4qGUBl02Gcsr6m0qa-OD6n0gZVE",
  authDomain: "clothing-db-7baff.firebaseapp.com",
  databaseURL: "https://clothing-db-7baff.firebaseio.com",
  projectId: "clothing-db-7baff",
  storageBucket: "clothing-db-7baff.appspot.com",
  messagingSenderId: "898099877769",
  appId: "1:898099877769:web:23cc34fffbf1f3002db358",
  measurementId: "G-CCTT71JKHR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
