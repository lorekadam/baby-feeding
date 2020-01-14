import React from "react";
import { FlatList } from "react-native";
import { IndexKeyExtractor } from "../utils";
import { Feeding, FeedingItem } from "../types";
import { FeedingListWrapper } from "../styles/FeedingList";
import FeedingListItem from "./FeedingListItem";
import NoFeedingLogs from "./NoFeedingLogs";

interface Props {
  feedings: Feeding[];
}

export const FeedingsList = (props: Props) => {
  return (
    <FeedingListWrapper>
      {props.feedings.length > 0 ? (
        <FlatList
          keyExtractor={IndexKeyExtractor}
          data={props.feedings.slice().reverse()}
          renderItem={({ item, index }: FeedingItem) => (
            <FeedingListItem item={item} index={index} />
          )}
        />
      ) : (
        <NoFeedingLogs />
      )}
    </FeedingListWrapper>
  );
};

export default FeedingsList;
