import React, { useState, useEffect, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";
import firebase from "firebase";
import "@firebase/firestore";
import AppNavigation from "../Navigation";
import { AdMobBanner } from "expo-ads-admob";
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

interface State {
  connection: boolean;
}

const firebaseConfig = {
  projectId: "babyfeeding-45bef",
  apiKey: "AIzaSyCcw6VeTIkYyXN7A1tBXqI4kEzynWDKJl8",
  authDomain: "babyfeeding-45bef.firebaseapp.com",
  databaseURL: "https://babyfeeding-45bef.firebaseio.com",
  storageBucket: "gs://babyfeeding-45bef.appspot.com"
};

const Main = () => {
  const userContext = useContext(UserContext);
  const feedingContext = useContext(FeedingContext);
  const { user } = userContext;

  const [connection, setConnection] = useState<State["connection"]>(false);

  const bannerError = e => {
    console.log(e);
  };

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state.isConnected);
    });
    return unsubscribe();
  }, []);

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

  return (
    <React.Fragment>
      <AppNavigation />
      {connection && (
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={
            __DEV__
              ? "ca-app-pub-3940256099942544/6300978111"
              : "ca-app-pub-4605316137256745/5795847812"
          }
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={bannerError}
        />
      )}
    </React.Fragment>
  );
};

export default Main;
