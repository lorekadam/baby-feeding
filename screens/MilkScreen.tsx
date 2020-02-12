import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { MILK_SCREEN } from "./types";
import Milk from "../components/Milk";
import { KeyboardAvoidingView } from "react-native";

interface Props extends NavigationProps {}

export const MilkScreen = (props: Props) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <BasicScreen theme={MILK_SCREEN}>
        <MyText textAlign="center" bold fontSize={4}>
          Milk
        </MyText>
        <Milk />
      </BasicScreen>
    </KeyboardAvoidingView>
  );
};

export default MilkScreen;
