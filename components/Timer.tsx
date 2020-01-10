import React from "react";
import { MyText } from "../styles/Text";
import { returnTimeString } from "../utils";

interface Props {
  seconds: number;
}

export const Timer = (props: Props) => {
  return <MyText fontSize={5}>{returnTimeString(props.seconds)}</MyText>;
};

export default Timer;
