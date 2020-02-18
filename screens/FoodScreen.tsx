import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FOOD_SCREEN } from "./types";
import Food from "../components/Food";
import { KeyboardAvoidingView, ScrollView } from "react-native";

interface Props extends NavigationProps {}

export const FoodScreen = (props: Props) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <BasicScreen theme={FOOD_SCREEN}>
        <MyText textAlign="center" bold fontSize={4}>
          Food
        </MyText>
        <ScrollView>
          <Food />
        </ScrollView>
      </BasicScreen>
    </KeyboardAvoidingView>
  );
};

export default FoodScreen;
