import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { colors } from "../styles/colors";
import Timer from "./Timer";

export const StartStop = () => {
  const [play, setPlay] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timeInterval, setTimeInterval] = useState(null);

  const startTimer = () => {
    if (!play) {
      const intervalId = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      setTimeInterval(intervalId);
    } else {
      clearInterval(timeInterval);
      setSeconds(0);
      setTimeInterval(null);
    }
    setPlay(!play);
  };

  return (
    <Row alignItems="center">
      <MyButton round onPress={startTimer}>
        <MaterialIcons
          name={play ? "stop" : "play-arrow"}
          color={colors.main}
          size={40}
        />
      </MyButton>
      {play && <Timer seconds={seconds} />}
    </Row>
  );
};

export default StartStop;
