import React, { useState } from "react";
import { View, Text } from "react-native";
import BasicScreen from "./BasicScreen";

export const HomeScreen = () => {
  return (
    <BasicScreen>
      <View>
        <Text>Home</Text>
      </View>
    </BasicScreen>
  );
};

export default HomeScreen;
