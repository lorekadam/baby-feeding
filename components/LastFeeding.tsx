import React from "react";
import { MyText } from "../styles/Text";
import { Feeding } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { returnTimeString } from "../utils";

dayjs.extend(customParseFormat);

interface Props {
  side: string;
  last: Feeding;
  now: string;
}

export const LastFeeding = (props: Props) => {
  const lastFeedDate = dayjs(
    `${props.last.dateStart} ${props.last.timeStart}`,
    "DD-MM-YYYY HH:mm"
  );
  const nowDate = dayjs(props.now, "DD-MM-YYYY HH:mm");
  const time = returnTimeString(nowDate.diff(lastFeedDate, "minute"), false);
  return (
    <MyText marginBottom={20} textAlign="center" bold fontSize={2}>
      Your last feeding was{" "}
      {time.length <= 2 ? `${time} minutes` : `${time} hours`} ago from{" "}
      {props.side.toLowerCase()} breast
    </MyText>
  );
};

export default LastFeeding;
