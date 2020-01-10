import React from "react";
import { Feeding } from "../types";
import { FeedingItem } from "../styles/FeedingList";
import { MyText } from "../styles/Text";

interface Props {
  item: Feeding;
}

export const FeedingListItem = (props: Props) => {
  return (
    <FeedingItem>
      <MyText>{props.item.dateStart}</MyText>
    </FeedingItem>
  );
};

export default FeedingListItem;
