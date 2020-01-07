import React from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { PAST_FEEDS } from "./types";
import ChangeScreen from "../components/ChangeScreen";

interface Props extends NavigationProps {}

export const HomeScreen = (props: Props) => {
  return (
    <BasicScreen>
      <ChangeScreen icon="history" screen={PAST_FEEDS} />
      <MyText textAlign="center" bold fontSize={4}>
        Feeding
      </MyText>
    </BasicScreen>
  );
};

export default HomeScreen;
