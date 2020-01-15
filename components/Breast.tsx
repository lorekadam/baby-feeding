import React, { useContext, useRef, useState, useEffect } from "react";
import { BreastOutside, BreastInside, Side, TapSide } from "../styles/Breast";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutChangeEvent
} from "react-native";
import { Transitioning, Transition } from "react-native-reanimated";
import { CenteredView } from "../styles/Views";
import { Row, Col } from "../styles/Grid";
import { FeedingContext } from "../contexts/FeedingContext";
import LastFeeding from "./LastFeeding";
import LeftRight from "./LeftRight";
import { LEFT, RIGHT } from "../globals";
import StartStop from "./StartStop";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const Breast = () => {
  const [insidePosition, setInsidePosition] = useState(0);
  const [height, setHeight] = useState(0);
  const feedingContext = useContext(FeedingContext);
  const { changed, side, setSide, feedings, both, setBoth } = feedingContext;
  const transition = <Transition.Change interpolation="easeInOut" />;
  const ref = useRef(null);

  useEffect(() => {
    if (side) {
      if (ref?.current) {
        ref.current.animateNextTransition();
      }
      setInsidePosition(side === LEFT ? -100 : 100);
    }
  }, [side]);

  const setContextSide = (side: string) => {
    setSide(side);
  };

  const breastHeight = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <CenteredView>
      {side && <LastFeeding side={side} last={feedings[feedings.length - 1]} />}
      <Row>
        <Side onLayout={breastHeight}>
          <TouchableWithoutFeedback onPress={() => setContextSide(LEFT)}>
            <TapSide />
          </TouchableWithoutFeedback>
        </Side>
        <Side rightSide>
          <TouchableWithoutFeedback onPress={() => setContextSide(RIGHT)}>
            <TapSide />
          </TouchableWithoutFeedback>
        </Side>
        <BreastOutside height={height}>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <BreastInside
              height={height}
              style={{ marginLeft: insidePosition }}
            />
          </Transitioning.View>
        </BreastOutside>
      </Row>
      <LeftRight
        side={side}
        both={both}
        setContextSide={setContextSide}
        setBoth={setBoth}
      />
      {changed && <StartStop />}
    </CenteredView>
  );
};

export default Breast;
