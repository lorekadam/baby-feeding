import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FORMULA_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const FormulaScreen = (props: Props) => {
  return (
    <BasicScreen theme={FORMULA_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Formula
      </MyText>
    </BasicScreen>
  );
};

export default FormulaScreen;
