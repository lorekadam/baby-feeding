import React from "react";
import { MyText } from "../styles/Text";

interface Props {
  side: string;
}

export const LastFeeding = (props: Props) => {
  return (
    <MyText marginBottom={20} textAlign="center" bold fontSize={2}>
      Your last feeding was from {props.side.toLowerCase()} breast
    </MyText>
  );
};

export default LastFeeding;
