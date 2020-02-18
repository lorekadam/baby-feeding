import React, { useEffect, useContext } from "react";
import firebase from "firebase";
import "@firebase/firestore";
import AppNavigation from "../Navigation";
import "dayjs/locale/en-gb";
import { UserContext } from "../contexts/UserContext";
import {
  createUserAPI,
  sendFeedingsFromLocalStorage,
  removeFeedingsFromLocalStorage,
  getAllUserFeedings
} from "../firebase/api";
import { FeedingContext } from "../contexts/FeedingContext";
import { Feeding } from "../types";
import { firebaseConfig } from "../keys";

const Main = () => {
  const userContext = useContext(UserContext);
  const feedingContext = useContext(FeedingContext);
  const { user } = userContext;

  //firebase init
  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
          userContext.setUser({
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL
          });
        } else {
          userContext.logOut();
        }
      });
    }
  }, []);

  // send / remove / get data after log in
  useEffect(() => {
    if (user.uid) {
      createUserAPI(user);
      const {
        feedings,
        toSend,
        toRemove,
        clearToSend,
        clearToRemove,
        setFeedings
      } = feedingContext;
      if (toSend.length > 0) {
        sendFeedingsFromLocalStorage(toSend).then(() => {
          clearToSend();
        });
      }
      if (toRemove.length > 0) {
        removeFeedingsFromLocalStorage(toRemove).then(() => {
          clearToRemove();
        });
      }
      if (feedings.length === 0) {
        getAllUserFeedings().then((data: Feeding[]) => {
          setFeedings(data);
        });
      }
    }
  }, [user.uid]);

  return <AppNavigation />;
};

export default Main;
