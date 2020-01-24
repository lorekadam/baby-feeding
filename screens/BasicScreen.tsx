import React, { ReactNode } from "react";
import { ScreenWrapper, ScreenRadiusBox } from "../styles/ScreenWrapper";
import { StatusBar } from "../styles/StatusBar";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/colors";

interface Props {
  children: ReactNode;
  theme: string;
}

export const BasicScreen = (props: Props) => {
  return (
    <ThemeProvider theme={theme[props.theme]}>
      <ScreenWrapper>
        <StatusBar />
        <ScreenRadiusBox>{props.children}</ScreenRadiusBox>
      </ScreenWrapper>
    </ThemeProvider>
  );
};

export default BasicScreen;
