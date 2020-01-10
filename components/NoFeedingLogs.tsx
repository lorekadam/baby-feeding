import React from "react";
import { MyText } from "../styles/Text";
import { CenteredView } from "../styles/Views";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export const NoFeedingLogs = () => {
  return (
    <CenteredView>
      <MyText textAlign="center" fontSize={3.5} bold marginBottom={10}>
        You, don't have any past feedings yet, go to home page and log one
      </MyText>
      <Ionicons name="md-happy" color={colors.main} size={60} />
    </CenteredView>
  );
};

export default NoFeedingLogs;
