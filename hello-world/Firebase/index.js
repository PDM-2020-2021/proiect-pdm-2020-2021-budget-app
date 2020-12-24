import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBzRqCJwEZpcaJnOo75EHiFgVeIixPsqmM",
  authDomain: "pdm-v2.firebaseapp.com",
  projectId: "pdm-v2",
});

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// ca sa nu mai repet db.collection(*collection_name*)
export const categoriesCollection = db.collection("Categories");
export const recurentPaymentsCollection = db.collection("ReccurentPayments");

export default firebase;
