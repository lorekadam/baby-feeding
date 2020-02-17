import React, { useState, useEffect, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";
import firebase from "firebase";
import "@firebase/firestore";
import AppNavigation from "../Navigation";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
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
import { bannerID, fullAdID } from "../globals";
import { firebaseConfig } from "../keys";

interface State {
  connection: boolean;
}

const Main = () => {
  const userContext = useContext(UserContext);
  const feedingContext = useContext(FeedingContext);
  const { user } = userContext;

  const [connection, setConnection] = useState<State["connection"]>(false);

  const bannerError = e => {
    console.log(e);
  };

  // watch connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state.isConnected);
    });
    return unsubscribe();
  }, []);

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

  // full ad init
  // useEffect(() => {
  //   AdMobInterstitial.setAdUnitID(fullAdID);
  //   AdMobInterstitial.addEventListener("interstitialDidClose", () => {
  //     console.log("closed ad");
  //   });
  // }, []);

  // full ad open
  // useEffect(() => {
  //   const showFullAd = async () => {
  //     await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  //     await AdMobInterstitial.showAdAsync();
  //   };
  //   showFullAd();
  // }, []);

  return <AppNavigation />;
};
// {connection && (
//   <AdMobBanner
//     bannerSize="smartBannerPortrait"
//     adUnitID={bannerID}
//     servePersonalizedAds={true}
//     onDidFailToReceiveAdWithError={bannerError}
//   />
// )}

export default Main;
