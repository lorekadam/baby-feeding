import React, { ReactNode } from "react";
import { ScreenWrapper, ScreenRadiusBox } from "../styles/ScreenWrapper";

interface Props {
  children: ReactNode;
}

export const BasicScreen = (props: Props) => {
  return (
    <ScreenWrapper>
      <ScreenRadiusBox>{props.children}</ScreenRadiusBox>
    </ScreenWrapper>
  );
};

export default BasicScreen;
