import React, { useState, useEffect } from "react";
import { MyText } from "../styles/Text";
import { Feeding } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface Props {
  last: Feeding;
}

export const LastFeeding = (props: Props) => {
  const { last } = props;
  return (
    <MyText marginBottom={20} textAlign="center" bold fontSize={1.8}>
      Last feeding was at {dayjs(last.timeStart, "HH:mm:ss").format("HH:mm")}{" "}
      from {last.both && "both breasts and ended on "}
      {last.side.toLowerCase()} breast
    </MyText>
  );
};

export default LastFeeding;
