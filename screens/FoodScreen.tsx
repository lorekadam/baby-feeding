import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FOOD_SCREEN } from "./types";
import Food from "../components/Food";

interface Props extends NavigationProps {}

export const FoodScreen = (props: Props) => {
  return (
    <BasicScreen theme={FOOD_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Food
      </MyText>
      <Food />
    </BasicScreen>
  );
};

export default FoodScreen;
