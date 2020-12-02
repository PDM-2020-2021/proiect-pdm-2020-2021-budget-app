import firebase from ".";
// import { nanoid } from "nanoid/async/index.native.js";
//import { nanoid } from "nanoid";
import { v4 as uuid } from 'uuid'
import { categoriesCollection } from ".";

// va impartiti pe fisiere mai mici toate functiile de CRUD per fiecare coletie din Firebase
// posibil sa mai faceti gen: bills.js, reports.js


var colors = require('nice-color-palettes');


export async function addCategory(payload) {
  // seteaza un ID random
  // nu as folosii indexi (1, 2, 3, 4..) nu sunt reliable, daca stergeti itemi se pot duplica ID-uri
  var id = uuid().replace(/\D/g,'').substr(0,5).replace(0,1);
  return categoriesCollection
    .doc(id)
    .set({
      id,
      ...payload,
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

// read about Promises and async/await
// functia asta imi returneaza un Promise, la care fac await in Home/index.js:84
export async function updateCategory(id, payload) {
  return categoriesCollection.doc(id).update(payload);
}

//pe acelasi principiu de mai sus scrieti si o functie de delete

// maybe get rid of this. Nu are trebuii sa tineti state-ul de checked din lista in baza de date
// tineti pe frontend ce e checked, deja puteti lua toate datele cu get categories si va folositi de filter method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// ca sa aratati doar datele care va intereseaza
export async function updateIsCheckedField(category) {
  console.log("Updating categories in firebase");

  firebase
    .database()
    .ref.child("Category")
    .orderByChild("name")
    .equalTo(category)
    .on("value", function (snapshot) {
      console.log(snapshot.val());
      // firebase.database().ref('Categories/' + snapshot.id).update({isChecked: !isChecked});
      snapshot.forEach(function (data) {
        console.log(data.key);
      });
    });
}
