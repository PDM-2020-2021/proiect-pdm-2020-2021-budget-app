import firebase from ".";
import { v4 as uuid } from 'uuid'
import { categoriesCollection, db } from ".";


var colors = require('nice-color-palettes');


export async function addCategory(payload) {
  var id = uuid().replace(/\D/g,'').substr(0,5).replace(0,1);
  // var id = parseInt(generatedID);
  var internId = parseInt(id);
  var name=payload.name;
  var price= parseInt(payload.price);
  return categoriesCollection
    .doc(id)
    .set({
      internId,
      name,
      price,
      color: colors[Math.floor(Math.random() * 100 ) + 1][0],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => console.log(error));
}

export async function getCategories(onCategoriesReceived) {
  const categoriesList = [];
  const snapshot = await categoriesCollection
    .orderBy("createdAt", "desc")
    .get();
  snapshot.forEach((doc) => {
    categoriesList.push(doc.data());
  });
  console.log(categoriesList);
  onCategoriesReceived(categoriesList);
}
export async function updateCategory(id, payload) {
  return categoriesCollection.doc(id).update(payload);
}

export async function deleteCategory(id){
  var idString = id.toString();
  categoriesCollection.doc(idString).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
    return true;
});
}
