import firebase from "firebase";
import { Feeding } from "../types";
import { User } from "../contexts/UserContext";

export const userIsLogged = () => {
  const user = firebase.auth();
  return user?.currentUser ? user.currentUser.uid : false;
};

export const createUserAPI = (user: User) => {
  const db = firebase.firestore();
  const docRef = db.collection("users").doc(user.uid);

  docRef.get().then(doc => {
    if (!doc.exists) {
      docRef.set(
        {
          ...user,
          feedings: []
        },
        {
          merge: true
        }
      );
    }
  });
};

export const addFeedingAPI = (feeding: Feeding) => {
  const user = userIsLogged();
  if (user) {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(user);
    docRef.update({
      feedings: firebase.firestore.FieldValue.arrayUnion(feeding)
    });
  }
};

export const removeFeedingAPI = (feeding: Feeding) => {
  const user = userIsLogged();
  if (user) {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(user);
    docRef.update({
      feedings: firebase.firestore.FieldValue.arrayRemove(feeding)
    });
  }
};

export const sendFeedingsFromLocalStorage = (feedings: Feeding[]) => {
  const user = userIsLogged();
  if (user) {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(user);
    return new Promise(resolve => {
      docRef
        .update({
          feedings: firebase.firestore.FieldValue.arrayUnion(...feedings)
        })
        .then(() => {
          resolve();
        });
    });
  }
};

export const removeFeedingsFromLocalStorage = (feedings: Feeding[]) => {
  const user = userIsLogged();
  if (user) {
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(user);
    return new Promise(resolve => {
      docRef
        .update({
          feedings: firebase.firestore.FieldValue.arrayRemove(...feedings)
        })
        .then(() => {
          resolve();
        });
    });
  }
};
