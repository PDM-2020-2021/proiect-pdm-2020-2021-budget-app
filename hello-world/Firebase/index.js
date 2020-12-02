import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBzRqCJwEZpcaJnOo75EHiFgVeIixPsqmM",
  authDomain: "pdm---reactnative.firebaseapp.com",
  projectId: "pdm---reactnative",
});

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// ca sa nu va repetati intr-una cu db.collection(*collection_name*)
// exportati de aici fiecare coletie pe care o mai puteti avea
export const categoriesCollection = db.collection("Categories");

export default firebase;
