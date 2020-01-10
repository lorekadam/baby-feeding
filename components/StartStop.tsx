import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { colors } from "../styles/colors";
import Timer from "./Timer";
import { FeedingContext } from "../contexts/FeedingContext";
import { Feeding } from "../types";
import { returnTimeString } from "../utils";

interface State {
  play: boolean;
  seconds: number;
  timeInterval: any;
  timeStart: string;
}

export const StartStop = () => {
  const feedingContext = useContext(FeedingContext);
  const { side, setFeedingLog } = feedingContext;
  const [play, setPlay] = useState<State["play"]>(false);
  const [seconds, setSeconds] = useState<State["seconds"]>(0);
  const [timeInterval, setTimeInterval] = useState<State["timeInterval"]>(null);
  const [timeStart, setTimeStart] = useState<State["timeStart"]>(null);

  const saveLog = () => {
    const data: Feeding = {
      side,
      dateStart: dayjs().format("DD-MM-YYYY"),
      timeStart,
      timeEnd: dayjs().format("HH:mm"),
      duration: returnTimeString(seconds)
    };
    setFeedingLog(data);
  };

  const startTimer = () => {
    if (!play) {
      setTimeStart(dayjs().format("HH:mm"));
      const intervalId = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
      setTimeInterval(intervalId);
    } else {
      clearInterval(timeInterval);
      saveLog();
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
