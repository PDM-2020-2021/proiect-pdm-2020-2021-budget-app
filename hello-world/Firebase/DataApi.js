import * as firebase from 'firebase';
import 'firebase/firestore';


// Required for side-effects


firebase.initializeApp({
    apiKey: 'AIzaSyBzRqCJwEZpcaJnOo75EHiFgVeIixPsqmM',
    authDomain: 'pdm---reactnative.firebaseapp.com',
    projectId: 'pdm---reactnative'
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
export function addCategory(){

    db
    .collection('Categories')
    .add(
              {
                name: "Carti",
                price: 5000,
                isChecked: false,
                color: "#3faa77",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            
              }
        
    ).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}


export async function getCategories(onCategoriesReceived)
{
    var categoriesList = [];
    var snapshot = await firebase.firestore()
    .collection('Categories')
    .orderBy('createdAt')
    .get()
    snapshot.forEach((doc) => {
        categoriesList.push(doc.data());
    })
console.log(categoriesList)
onCategoriesReceived(categoriesList)

}


export async function updateIsCheckedField(category, updateComplete){
    console.log("Updating categories in firebase");

    firebase.firestore()
    .collection('Categories')
    .doc(category.id).set(category)
    .then(() => update({isChecked: !isChecked}))
    .catch((error) => console.log(error));
}