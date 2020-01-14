import React from "react";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { MyText } from "../styles/Text";
import { colors } from "../styles/colors";
import { LEFT, RIGHT, BOTH } from "../globals";

interface Props {
  both: boolean;
  side: string;
  setContextSide(side: string): void;
  setBoth(): void;
}

export const LeftRight = (props: Props) => {
  const { both, setBoth, side, setContextSide } = props;
  return (
    <Row>
      <MyButton active={side === LEFT} onPress={() => setContextSide(LEFT)}>
        <MyText color={side === LEFT && colors.white} bold>
          LEFT
        </MyText>
      </MyButton>
      <MyButton active={both} onPress={setBoth}>
        <MyText color={both && colors.white} bold>
          BOTH
        </MyText>
      </MyButton>
      <MyButton active={side === RIGHT} onPress={() => setContextSide(RIGHT)}>
        <MyText color={side === RIGHT && colors.white} bold>
          RIGHT
        </MyText>
      </MyButton>
    </Row>
  );
};

export default LeftRight;
