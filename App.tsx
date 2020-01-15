import React, { useState, useEffect } from "react";
import AppNavigation from "./Navigation";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import { AdMobBanner } from "expo-ads-admob";
import { FeedingProvider } from "./contexts/FeedingContext";
import "dayjs/locale/en-gb";

interface State {
  fontLoaded: boolean;
  connection: boolean;
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState<State["fontLoaded"]>(false);
  const [connection, setConnection] = useState<State["connection"]>(false);

  const bannerError = e => {
    console.log(e);
  };

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        nunito: require("./assets/fonts/Nunito-Regular.ttf"),
        nunitoLight: require("./assets/fonts/Nunito-Light.ttf"),
        nunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf")
      });
      setFontLoaded(true);
    };
    loadFont();
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(state.isConnected);
    });
    return unsubscribe();
  }, []);

  return fontLoaded ? (
    <FeedingProvider>
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
    </FeedingProvider>
  ) : null;
};

export default App;
