import React from "react";
import { MyText } from "../styles/Text";
import { CenteredView } from "../styles/Views";
import { Ionicons } from "@expo/vector-icons";
import { colors, theme } from "../styles/colors";
import { HISTORY_SCREEN } from "../screens/types";

export const NoFeedingLogs = () => {
  return (
    <CenteredView>
      <MyText textAlign="center" fontSize={3.5} bold marginBottom={10}>
        You, don't have any past feedings yet, go to home page and log one
      </MyText>
      <Ionicons name="md-happy" color={theme[HISTORY_SCREEN].font} size={60} />
    </CenteredView>
  );
};

export default NoFeedingLogs;
