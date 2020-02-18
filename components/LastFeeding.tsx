import React from "react";
import { MyText } from "../styles/Text";
import { Feeding } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { BREAST, FORMULA_MILK, BREAST_MILK, FOOD } from "../globals";
import { Row } from "../styles/Grid";

dayjs.extend(customParseFormat);

interface Props {
  last: Feeding;
}

export const LastFeeding = (props: Props) => {
  const { last } = props;
  return (
    <Row
      gutters={false}
      marginBottom={10}
      flexWrap="wrap"
      justifyContent="center"
    >
      <MyText textAlign="center" bold fontSize={1.8}>
        Last feeding was at {dayjs(last.timeStart, "HH:mm:ss").format("HH:mm")}{" "}
      </MyText>
      {last.type === BREAST && (
        <MyText marginBottom={20} textAlign="center" bold fontSize={1.8}>
          from {last.both && "both breasts and ended on "}
          {last.side.toLowerCase()} breast
        </MyText>
      )}
      {(last.type === FORMULA_MILK || last.type === BREAST_MILK) && (
        <MyText marginBottom={20} textAlign="center" bold fontSize={1.7}>
          from bottle. It was {last.mililitres}ml
          {last.scoops && `, ${last.scoops} scoops`} of{" "}
          {last.milkType.toLowerCase().replace(/_/g, " ")}
        </MyText>
      )}
      {last.type === FOOD && (
        <MyText marginBottom={20} textAlign="center" bold fontSize={1.7}>
          It was {last.products.join(", ")}
        </MyText>
      )}
    </Row>
  );
};

export default LastFeeding;
