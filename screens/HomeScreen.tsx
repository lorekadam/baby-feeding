import React from "react";
import { View, TouchableOpacity } from "react-native";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { PAST_FEEDS } from "./types";

interface Props extends NavigationProps {}

export const HomeScreen = (props: Props) => {
  return (
    <BasicScreen>
      <View>
        <MyText>Home Screen</MyText>
        <TouchableOpacity onPress={() => props.navigation.navigate(PAST_FEEDS)}>
          <MyText>History</MyText>
        </TouchableOpacity>
      </View>
    </BasicScreen>
  );
};

export default HomeScreen;
