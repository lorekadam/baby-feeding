import React, { useContext, useEffect } from "react";
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
import { TimerContext } from "../contexts/TimerContext";

interface Props {
  type: string;
}

export const StartStop = (props: Props) => {
  const { setFeedingLog } = useContext(FeedingContext);
  const {
    play,
    seconds,
    active,
    dateStart,
    timeStart,
    timeInterval,
    setSeconds,
    setTimer,
    startTimer,
    stopTimer
  } = useContext(TimerContext);

  const saveLog = () => {
    const data: FeedingSave = {
      dateStart,
      timeStart,
      timeEnd: dayjs().format("HH:mm:ss"),
      duration: returnTimeString(seconds),
      type: props.type
    };
    setFeedingLog(data);
  };

  const toggleTimer = () => {
    if (!play) {
      if (timeStart === null) {
        setTimer({
          dateStart: dayjs().format("DD-MM-YYYY"),
          timeStart: dayjs().format("HH:mm:ss")
        });
      }
      startTimer();
    } else {
      saveLog();
      stopTimer();
    }
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === "background") {
      setTimer({ active: false });
    } else {
      setTimer({ active: true });
    }
  };

  const updateSecondsToNow = () => {
    const start = dayjs(timeStart, "HH:mm:ss");
    setSeconds(start.diff(dayjs(), "second") * -1);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (timeStart && timeInterval === null) {
      updateSecondsToNow();
      startTimer();
    }
  }, [timeStart]);

  useEffect(() => {
    if (active && timeStart) {
      updateSecondsToNow();
    }
  }, [active]);

  return (
    <Row alignItems="center">
      <MyButton round onPress={toggleTimer}>
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
