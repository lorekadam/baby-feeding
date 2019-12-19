import React, { ReactChild } from "react";
import { View } from "react-native";
import { StatusBar } from "../styles/StatusBar";

interface Props {
  children: ReactChild;
}

export const BasicScreen = (props: Props) => {
  return (
    <View>
      <StatusBar />
      {props.children}
    </View>
  );
};

export default BasicScreen;
