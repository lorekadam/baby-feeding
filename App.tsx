import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import "dayjs/locale/en-gb";
import { UserProvider } from "./contexts/UserContext";
import { FeedingProvider } from "./contexts/FeedingContext";
import Main from "./components/Main";

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
  }, []);

  return fontLoaded ? (
    <UserProvider>
      <FeedingProvider>
        <Main />
      </FeedingProvider>
    </UserProvider>
  ) : null;
};

export default App;
