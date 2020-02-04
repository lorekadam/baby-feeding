import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { MILK_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const MilkScreen = (props: Props) => {
  return (
    <BasicScreen theme={MILK_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Milk
      </MyText>
    </BasicScreen>
  );
};

export default MilkScreen;
