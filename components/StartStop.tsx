import React, { useState, useContext, useEffect } from "react";
import { AppState } from "react-native";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { colors } from "../styles/colors";
import Timer from "./Timer";
import { FeedingContext } from "../contexts/FeedingContext";
import { FeedingSave } from "../types";
import { returnTimeString } from "../utils";

interface State {
  play: boolean;
  seconds: number;
  timeInterval: any;
  active: boolean;
}

export const StartStop = () => {
  const feedingContext = useContext(FeedingContext);
  const { setFeedingLog, setTimer, timer } = feedingContext;
  const [play, setPlay] = useState<State["play"]>(false);
  const [seconds, setSeconds] = useState<State["seconds"]>(0);
  const [timeInterval, setTimeInterval] = useState<State["timeInterval"]>(null);
  const [active, setActive] = useState<State["active"]>(true);

  const saveLog = () => {
    const data: FeedingSave = {
      timeEnd: dayjs().format("HH:mm:ss"),
      duration: returnTimeString(seconds)
    };
    setFeedingLog(data);
  };

  const startTimer = (addTime = true) => {
    if (!play) {
      if (addTime) {
        setTimer({
          dateStart: dayjs().format("DD-MM-YYYY"),
          timeStart: dayjs().format("HH:mm:ss")
        });
      }
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
    if (timer?.timeStart) {
      startTimer(false);
    }
  }, []);

  useEffect(() => {
    if (active && timer?.timeStart) {
      const start = dayjs(timer.timeStart, "HH:mm:ss");
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
