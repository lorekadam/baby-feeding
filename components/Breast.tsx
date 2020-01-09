import React, { useContext, useRef, useState, useEffect } from "react";
import { BreastOutside, BreastInside, Side, TapSide } from "../styles/Breast";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Transitioning, Transition } from "react-native-reanimated";

import dayjs from "dayjs";

import { CenteredView } from "../styles/Views";
import { Row } from "../styles/Grid";
import { FeedingContext } from "../contexts/FeedingContext";
import { MyButton } from "../styles/Buttons";
import { MyText } from "../styles/Text";
import { colors } from "../styles/colors";
import LastFeeding from "./LastFeeding";
import LeftRight from "./LeftRight";
import { LEFT, RIGHT } from "../globals";
import StartStop from "./StartStop";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute"
  }
});

export const Breast = () => {
  const transition = <Transition.Change interpolation="easeInOut" />;
  const ref = useRef(null);
  const [insidePosition, setInsidePosition] = useState(50);
  const [changed, setChanged] = useState(false);
  const feedingContext = useContext(FeedingContext);
  const { side, setSide } = feedingContext;

  useEffect(() => {
    if (side) {
      if (ref?.current) {
        ref.current.animateNextTransition();
      }
      setInsidePosition(side === LEFT ? 35 : 65);
    }
  }, [side]);

  const setContextSide = (side: string) => {
    setSide(side);
    setChanged(true);
  };

  return (
    <CenteredView>
      {side && <LastFeeding side={side} />}
      <Row>
        <Side>
          <TouchableWithoutFeedback onPress={() => setContextSide(LEFT)}>
            <TapSide />
          </TouchableWithoutFeedback>
        </Side>
        <Side rightSide>
          <TouchableWithoutFeedback onPress={() => setContextSide(RIGHT)}>
            <TapSide />
          </TouchableWithoutFeedback>
        </Side>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={styles.wrapper}
        >
          <BreastOutside>
            <BreastInside style={{ left: `${insidePosition}%` }} />
          </BreastOutside>
        </Transitioning.View>
      </Row>
      <LeftRight side={side} setContextSide={setContextSide} />
      {changed && <StartStop />}
    </CenteredView>
  );
};

export default Breast;
