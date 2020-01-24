import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import Breast from "../components/Breast";
import { BREAST_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const BreastScreen = (props: Props) => {
  return (
    <BasicScreen theme={BREAST_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Feeding
      </MyText>
      <Breast />
    </BasicScreen>
  );
};

export default BreastScreen;
