import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feeding } from "../types";
import { FeedingItem } from "../styles/FeedingList";
import { MyText } from "../styles/Text";
import { colors } from "../styles/colors";
import { MyButton } from "../styles/Buttons";
import { FeedingContext } from "../contexts/FeedingContext";
import { Row } from "../styles/Grid";

interface Props {
  item: Feeding;
  index: number;
}

export const FeedingListItem = (props: Props) => {
  const feedingContext = useContext(FeedingContext);
  const { removeFeedingLog } = feedingContext;
  return (
    <FeedingItem>
      <MyButton
        borderColor={colors.error}
        small
        top={-12}
        right={-12}
        position="absolute"
        round
        onPress={() => removeFeedingLog(props.index)}
      >
        <MaterialIcons name="close" color={colors.error} size={16} />
      </MyButton>
      <Row alignItems="center">
        <MaterialIcons name="date-range" color={colors.main} size={22} />
        <MyText flex alignItems="center" marginLeft={10}>
          {props.item.dateStart}
        </MyText>
      </Row>
      <Row alignItems="center">
        <MaterialIcons name="access-time" color={colors.main} size={22} />
        <MyText marginRight={10} marginLeft={10}>
          {props.item.timeStart}
        </MyText>
        <MaterialIcons name="timer" color={colors.main} size={22} />
        <MyText marginLeft={10}>{props.item.duration}</MyText>
      </Row>
      <Row>
        <MyText transform="capitalize">{props.item.side}</MyText>
        <MyText> side</MyText>
      </Row>
    </FeedingItem>
  );
};

export default FeedingListItem;
