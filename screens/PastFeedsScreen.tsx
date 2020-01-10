import React, { useContext } from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import { FEED_SCREEN } from "./types";
import ChangeScreen from "../components/ChangeScreen";
import { FeedingContext } from "../contexts/FeedingContext";
import FeedingsList from "../components/FeedingsList";

interface Props extends NavigationProps {}

export const PastFeedsScreen = (props: Props) => {
  const feedingContext = useContext(FeedingContext);
  const { feedings } = feedingContext;
  return (
    <BasicScreen>
      <ChangeScreen icon="home" screen={FEED_SCREEN} />
      <MyText textAlign="center" bold fontSize={4}>
        Past feedings
      </MyText>
      <FeedingsList feedings={feedings} />
    </BasicScreen>
  );
};

export default PastFeedsScreen;
