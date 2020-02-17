import React from "react";
import { Col } from "../styles/Grid";
import { SvgCss } from "react-native-svg";
import { FoodIcon as FoodIconType } from "../types";
import { theme, colors } from "../styles/colors";
import { FOOD_SCREEN } from "../screens/types";
import { TouchableWithoutFeedback } from "react-native";

interface Props {
  food: FoodIconType;
  active: boolean;
  onPress(type: string): void;
}

export const FoodIcon = (props: Props) => {
  const { food, active, onPress } = props;
  const toggleFood = () => {
    onPress(food.type);
  };
  return (
    <Col key={food.type} alignItems="center">
      <TouchableWithoutFeedback onPress={toggleFood}>
        <SvgCss
          xml={food.svg(active ? theme[FOOD_SCREEN].main : colors.gray)}
          width="80%"
          height="100"
        />
      </TouchableWithoutFeedback>
    </Col>
  );
};

export default FoodIcon;
