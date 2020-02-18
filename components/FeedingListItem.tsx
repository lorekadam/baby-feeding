import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feeding } from "../types";
import { FeedingItem } from "../styles/FeedingList";
import { MyText } from "../styles/Text";
import { colors, theme } from "../styles/colors";
import { MyButton, Pill } from "../styles/Buttons";
import { FeedingContext } from "../contexts/FeedingContext";
import { Row } from "../styles/Grid";
import { ThemeProvider } from "styled-components";
import dayjs from "dayjs";
import {
  ACCOUNT_SCREEN,
  FOOD_SCREEN,
  BREAST_SCREEN,
  MILK_SCREEN
} from "../screens/types";
import { FOOD, BREAST } from "../globals";

interface Props {
  item: Feeding;
  index: number;
}

export const FeedingListItem = (props: Props) => {
  const feedingContext = useContext(FeedingContext);
  const { removeFeedingLog } = feedingContext;
  const { item } = props;
  let themeName;

  if (item.type === FOOD) {
    themeName = FOOD_SCREEN;
  } else if (item.type === BREAST) {
    themeName = BREAST_SCREEN;
  } else {
    themeName = MILK_SCREEN;
  }

  return (
    <ThemeProvider theme={theme[themeName]}>
      <FeedingItem>
        <MyButton
          borderColor={theme[themeName].main}
          small
          top={-12}
          right={-12}
          position="absolute"
          round
          onPress={() => removeFeedingLog(props.index)}
        >
          <MaterialIcons name="close" color={theme[themeName].main} size={16} />
        </MyButton>
        <Row>
          <Pill>
            <MyText format="capitalize" color={colors.white}>
              {themeName}
            </MyText>
          </Pill>
        </Row>
        <Row alignItems="center">
          <MaterialIcons
            name="date-range"
            color={theme[themeName].main}
            size={22}
          />
          <MyText flex alignItems="center" marginLeft={10}>
            {item.dateStart}
          </MyText>
        </Row>
        <Row alignItems="center">
          <MaterialIcons
            name="access-time"
            color={theme[themeName].main}
            size={22}
          />
          <MyText marginRight={10} marginLeft={10}>
            {dayjs(item.timeStart, "HH:mm:ss").format("HH:mm")}
          </MyText>
          {item.duration && (
            <>
              <MaterialIcons
                name="timer"
                color={theme[themeName].main}
                size={22}
              />
              <MyText marginLeft={10}>{item.duration}</MyText>
            </>
          )}
        </Row>
        {themeName === BREAST_SCREEN && item.side && (
          <Row>
            {item.both && <MyText>Both breasts, ended on </MyText>}
            <MyText transform={item.both ? "lowercase" : "capitalize"}>
              {item.side}
            </MyText>
            <MyText> side</MyText>
          </Row>
        )}
        {themeName === FOOD_SCREEN && item.products?.length > 0 && (
          <Row>
            <MyText transform="lowercase">{item.products.join(", ")}</MyText>
          </Row>
        )}
        {themeName === MILK_SCREEN && (
          <MyText>
            {item.mililitres}ml{item.scoops && `, ${item.scoops} scoops`} of{" "}
            {item.milkType.toLowerCase().replace(/_/g, " ")}
          </MyText>
        )}
      </FeedingItem>
    </ThemeProvider>
  );
};

export default FeedingListItem;
