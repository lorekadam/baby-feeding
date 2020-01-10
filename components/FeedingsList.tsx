import React from "react";
import { FlatList } from "react-native";
import { IndexKeyExtractor } from "../utils";
import { Feeding, FeedingItem } from "../types";
import { MyText } from "../styles/Text";
import { FeedingListWrapper } from "../styles/FeedingList";
import FeedingListItem from "./FeedingListItem";

interface Props {
  feedings: Feeding[];
}

export const FeedingsList = (props: Props) => {
  return (
    <FeedingListWrapper>
      <FlatList
        keyExtractor={IndexKeyExtractor}
        data={props.feedings.reverse()}
        renderItem={({ item, index }: FeedingItem) => (
          <FeedingListItem item={item} />
        )}
      />
    </FeedingListWrapper>
  );
};

export default FeedingsList;
