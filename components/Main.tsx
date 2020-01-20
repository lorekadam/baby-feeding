import React, { useState, useEffect, useContext } from "react";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import firebase from "firebase";
import "@firebase/firestore";
import AppNavigation from "../Navigation";
import { AdMobBanner } from "expo-ads-admob";
import "dayjs/locale/en-gb";
import { UserContext } from "../contexts/UserContext";

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
  const [connection, setConnection] = useState<State["connection"]>(false);

  const bannerError = e => {
    console.log(e);
  };

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
        if (user != null) {
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
