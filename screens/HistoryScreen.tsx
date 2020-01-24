import React, { useContext } from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FeedingContext } from "../contexts/FeedingContext";
import FeedingsList from "../components/FeedingsList";
import { HISTORY_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const HistoryScreen = (props: Props) => {
  const feedingContext = useContext(FeedingContext);
  const { feedings } = feedingContext;
  return (
    <BasicScreen theme={HISTORY_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Past feedings
      </MyText>
      <FeedingsList feedings={feedings} />
    </BasicScreen>
  );
};

export default HistoryScreen;
