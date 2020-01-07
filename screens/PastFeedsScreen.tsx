import React from "react";
import { View, TouchableOpacity } from "react-native";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FEED_SCREEN } from "./types";
import ChangeScreen from "../components/ChangeScreen";

interface Props extends NavigationProps {}

export const PastFeedsScreen = (props: Props) => {
  return (
    <BasicScreen>
      <ChangeScreen icon="home" screen={FEED_SCREEN} />
      <MyText textAlign="center" bold fontSize={4}>
        Past feeds
      </MyText>
    </BasicScreen>
  );
};

export default PastFeedsScreen;
