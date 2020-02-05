import React from "react";
import { Row } from "../styles/Grid";
import { MyButton } from "../styles/Buttons";
import { MyText } from "../styles/Text";
import { MilkType as MilktT } from "../types";
import { FORMULA_MILK, BREAST_MILK } from "../globals";
import { colors } from "../styles/colors";

interface Props {
  type: MilktT;
  setMilkType(type: MilktT): void;
}

export const MilkType = (props: Props) => {
  const { type, setMilkType } = props;
  return (
    <Row>
      <MyButton
        active={type === FORMULA_MILK}
        onPress={() => setMilkType(FORMULA_MILK)}
      >
        <MyText color={type === FORMULA_MILK && colors.white} bold>
          FORMULA
        </MyText>
      </MyButton>
      <MyButton
        active={type === BREAST_MILK}
        onPress={() => setMilkType(BREAST_MILK)}
      >
        <MyText color={type === BREAST_MILK && colors.white} bold>
          BREAST
        </MyText>
      </MyButton>
    </Row>
  );
};

export default MilkType;
