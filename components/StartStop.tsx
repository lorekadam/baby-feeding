import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { colors } from "../styles/colors";

export const StartStop = () => {
  return (
    <Row>
      <MyButton round>
        <MaterialIcons name="play-arrow" color={colors.main} size={40} />
      </MyButton>
    </Row>
  );
};

export default StartStop;
