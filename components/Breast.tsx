import React, { useContext, useRef, useState, useEffect } from "react";
import { BreastOutside, BreastInside, Side, TapSide } from "../styles/Breast";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Transitioning, Transition } from "react-native-reanimated";
import { CenteredView } from "../styles/Views";
import { Row } from "../styles/Grid";
import { FeedingContext } from "../contexts/FeedingContext";
import LastFeeding from "./LastFeeding";
import LeftRight from "./LeftRight";
import { LEFT, RIGHT } from "../globals";
import StartStop from "./StartStop";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute"
  }
});

export const Breast = () => {
  const [insidePosition, setInsidePosition] = useState(50);
  const feedingContext = useContext(FeedingContext);
  const { changed, side, setSide, feedings } = feedingContext;
  const transition = <Transition.Change interpolation="easeInOut" />;
  const ref = useRef(null);
  const now = dayjs().format("DD-MM-YYYY HH:mm");

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
  };

  return (
    <CenteredView>
      {side && (
        <LastFeeding
          side={side}
          last={feedings[feedings.length - 1]}
          now={now}
        />
      )}
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
