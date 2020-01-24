import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FOOD_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const FoodScreen = (props: Props) => {
  return (
    <BasicScreen theme={FOOD_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Food
      </MyText>
    </BasicScreen>
  );
};

export default FoodScreen;
