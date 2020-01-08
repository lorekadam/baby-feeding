import React, { useContext } from "react";
import { BreastOutside, BreastInside, Side } from "../styles/Breast";
import { CenteredView } from "../styles/Views";
import { Row } from "../styles/Grid";
import { TouchableWithoutFeedback } from "react-native";
import { FeedingContext } from "../contexts/FeedingContext";

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export const Breast = () => {
  const feedingContext = useContext(FeedingContext);
  const { side, setSide } = feedingContext;
  return (
    <CenteredView>
      <Row>
        <Side>
          <TouchableWithoutFeedback onPress={() => setSide(LEFT)}>
            <BreastOutside active={side === LEFT}>
              <BreastInside active={side === LEFT} />
            </BreastOutside>
          </TouchableWithoutFeedback>
        </Side>
        <Side rightSide>
          <TouchableWithoutFeedback onPress={() => setSide(RIGHT)}>
            <BreastOutside active={side === RIGHT}>
              <BreastInside active={side === RIGHT} />
            </BreastOutside>
          </TouchableWithoutFeedback>
        </Side>
      </Row>
    </CenteredView>
  );
};

export default Breast;
