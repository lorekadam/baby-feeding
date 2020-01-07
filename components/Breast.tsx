import React, { useState } from "react";
import { BreastOutside, BreastInside, Side } from "../styles/Breast";
import { CenteredView } from "../styles/Views";
import { Row } from "../styles/Grid";
import { TouchableWithoutFeedback } from "react-native";

export const Breast = () => {
  return (
    <CenteredView>
      <Row>
        <Side>
          <TouchableWithoutFeedback onPress={() => console.log("Left")}>
            <BreastOutside>
              <BreastInside />
            </BreastOutside>
          </TouchableWithoutFeedback>
        </Side>
        <Side rightSide>
          <TouchableWithoutFeedback onPress={() => console.log("Right")}>
            <BreastOutside>
              <BreastInside />
            </BreastOutside>
          </TouchableWithoutFeedback>
        </Side>
      </Row>
    </CenteredView>
  );
};

export default Breast;
