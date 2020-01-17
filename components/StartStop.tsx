import React, { useState, useContext, useEffect } from "react";
import { AppState } from "react-native";
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
  active: boolean;
}

export const StartStop = () => {
  const feedingContext = useContext(FeedingContext);
  const { side, both, setFeedingLog } = feedingContext;
  const [play, setPlay] = useState<State["play"]>(false);
  const [seconds, setSeconds] = useState<State["seconds"]>(0);
  const [timeInterval, setTimeInterval] = useState<State["timeInterval"]>(null);
  const [timeStart, setTimeStart] = useState<State["timeStart"]>(null);
  const [active, setActive] = useState<State["active"]>(true);

  const saveLog = () => {
    const data: Feeding = {
      side,
      dateStart: dayjs().format("DD-MM-YYYY"),
      timeStart,
      timeEnd: dayjs().format("HH:mm:ss"),
      duration: returnTimeString(seconds),
      both
    };
    setFeedingLog(data);
  };

  const startTimer = () => {
    if (!play) {
      setTimeStart(dayjs().format("HH:mm:ss"));
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

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === "background") {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (active && timeStart) {
      const start = dayjs(timeStart, "HH:mm:ss");
      setSeconds(start.diff(dayjs(), "second") * -1);
    }
  }, [active]);

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
