import firebase from "firebase";
import { Feeding } from "../types";

export const addFeeding = (feeding: Feeding, user: string) => {
  const db = firebase.firestore();
  if (user) {
    const docRef = db.collection("users").doc(user);

    docRef.get().then(doc => {
      if (doc.exists) {
        docRef
          .update({
            feedings: firebase.firestore.FieldValue.arrayUnion(feeding)
          })
          .then(function() {
            console.log("Document written update");
          })
          .catch(function() {
            console.error("Error adding document");
          });
      } else {
        docRef
          .set(
            {
              feedings: [feeding]
            },
            {
              merge: true
            }
          )
          .then(function() {
            console.log("Document written first");
          })
          .catch(function() {
            console.error("Error adding document");
          });
      }
    });
  }
};
