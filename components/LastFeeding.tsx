import React, { useState, useEffect } from "react";
import { MyText } from "../styles/Text";
import { Feeding } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { BREAST, FORMULA_MILK, BREAST_MILK } from "../globals";

dayjs.extend(customParseFormat);

interface Props {
  last: Feeding;
}

export const LastFeeding = (props: Props) => {
  const { last } = props;
  return (
    <React.Fragment>
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
        <MyText marginBottom={20} textAlign="center" bold fontSize={1.8}>
          from bottle. It was {last.mililitres}ml{" "}
          {last.grams && `, ${last.grams}g`} of{" "}
          {last.milkType.toLowerCase().replace(/_/g, " ")}
        </MyText>
      )}
    </React.Fragment>
  );
};

export default LastFeeding;
