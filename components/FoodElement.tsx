import React from "react";
import { Pill } from "../styles/Buttons";
import { MyText } from "../styles/Text";
import { colors } from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  name: string;
  onPress(name: string): void;
}

export const FoodElement = (props: Props) => {
  const onPress = () => {
    props.onPress(props.name);
  };
  return (
    <Pill onPress={onPress}>
      <MyText fontSize={1.6} color={colors.white} marginRight={5}>
        {props.name}
      </MyText>
      <MaterialIcons name="close" color={colors.white} />
    </Pill>
  );
};

export default FoodElement;
