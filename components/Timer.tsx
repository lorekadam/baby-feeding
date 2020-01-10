import React from "react";
import { MyText } from "../styles/Text";

interface Props {
  seconds: number;
}

export const Timer = (props: Props) => {
  const minutes = Math.floor(props.seconds / 60);
  const seconds = props.seconds % 60;
  return (
    <MyText fontSize={5}>
      {minutes > 10 ? minutes : `0${minutes}`}:
      {seconds > 10 ? seconds : `0${seconds}`}
    </MyText>
  );
};

export default Timer;
