import firebase from ".";
import { v4 as uuid } from 'uuid'
import { recurentPaymentsCollection, db } from ".";

export async function addPayment(payload) {
  var id = uuid().replace(/\D/g,'').substr(0,5).replace(0,1);
  var internId = parseInt(id);
  var billName=payload.billName;
  var amount= parseInt(payload.amount);
  var day= parseInt(payload.day);
  return recurentPaymentsCollection
    .doc(id)
    .set({
      internId,
      billName,
      amount,
      day,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => console.log(error));
}

export async function getPayments(onPaymentsReceived) {
  const paymentsList = [];
  const snapshot = await recurentPaymentsCollection
    //.orderBy("createdAt", "desc")
    .get();
  snapshot.forEach((doc) => {
    paymentsList.push(doc.data());
  });
  //console.log(paymentsList);
  onPaymentsReceived(paymentsList);
} 