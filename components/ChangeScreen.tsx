import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ChangeScreenWrapper } from "../styles/ScreenWrapper";
import { TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { withNavigation } from "react-navigation";
import { NavigationProps } from "../types";

interface Props extends NavigationProps {
  screen: string;
  icon: string;
}

export const ChangeScreen = (props: Props) => {
  return (
    <ChangeScreenWrapper>
      <TouchableOpacity onPress={() => props.navigation.navigate(props.screen)}>
        <MaterialIcons name={props.icon} color={colors.main} size={40} />
      </TouchableOpacity>
    </ChangeScreenWrapper>
  );
};

export default withNavigation(ChangeScreen);
