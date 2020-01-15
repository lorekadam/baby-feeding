import React, { ReactNode, useState, useEffect } from "react";
import * as Network from "expo-network";
import { ScreenWrapper, ScreenRadiusBox } from "../styles/ScreenWrapper";
import { AdMobBanner } from "expo-ads-admob";

interface Props {
  children: ReactNode;
}

export const BasicScreen = (props: Props) => {
  const [connection, setConnection] = useState(false);
  const bannerError = e => {
    console.log(e);
  };
  useEffect(() => {
    (async function checkConncection() {
      const conn = await Network.getNetworkStateAsync();
      if (conn && conn.isConnected) {
        setConnection(true);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <ScreenWrapper>
        <ScreenRadiusBox>{props.children}</ScreenRadiusBox>
      </ScreenWrapper>
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

export default BasicScreen;
