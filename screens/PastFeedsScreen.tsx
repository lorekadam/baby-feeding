import React from "react";
import { View, TouchableOpacity } from "react-native";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FEED_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const PastFeedsScreen = (props: Props) => {
  return (
    <BasicScreen>
      <View>
        <MyText>Past feeds</MyText>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(FEED_SCREEN)}
        >
          <MyText>Home</MyText>
        </TouchableOpacity>
      </View>
    </BasicScreen>
  );
};

export default PastFeedsScreen;
