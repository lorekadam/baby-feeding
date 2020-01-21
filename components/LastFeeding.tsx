import React, { useState, useEffect } from "react";
import { MyText } from "../styles/Text";
import { Feeding } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { returnTimeString } from "../utils";

dayjs.extend(customParseFormat);

interface Props {
  last: Feeding;
}

export const LastFeeding = (props: Props) => {
  const [time, setTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const countTimeBackwards = () => {
    if (props.last) {
      const lastFeedDate = dayjs(
        `${props.last.dateStart} ${props.last.timeStart}`,
        "DD-MM-YYYY HH:mm"
      );
      const nowDate = dayjs(dayjs(), "DD-MM-YYYY HH:mm");
      setTime(returnTimeString(nowDate.diff(lastFeedDate, "minute"), false));
    }
  };

  const setChecker = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    countTimeBackwards();
    setIntervalId(
      setInterval(() => {
        countTimeBackwards();
      }, 1000 * 60)
    );
  };

  useEffect(() => {
    setChecker();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setChecker();
    return () => clearInterval(intervalId);
  }, [props.last]);

  if (time && time !== `00:00` && time !== `0`) {
    return (
      <MyText marginBottom={20} textAlign="center" bold fontSize={1.8}>
        Last feeding was{" "}
        {time.length <= 2 ? `${time} minutes` : `${time} hours`} ago from{" "}
        {props.last.both && "both breasts and ended on "}
        {props.last.side.toLowerCase()} breast
      </MyText>
    );
  } else {
    return null;
  }
};

export default LastFeeding;
