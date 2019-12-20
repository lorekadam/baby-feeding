import React, { useState, useEffect } from "react";
import AppNavigation from "./Navigation";
import * as Font from "expo-font";

interface State {
  fontLoaded: boolean;
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState<State["fontLoaded"]>(false);

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

  return fontLoaded ? <AppNavigation /> : null;
};

export default App;
