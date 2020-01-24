import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ChangeScreenWrapper } from "../styles/ScreenWrapper";
import { TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { withNavigation } from "react-navigation";
import { NavigationProps } from "../types";
import { Row } from "../styles/Grid";
import { ACCOUNT_SCREEN } from "../screens/types";

interface Props extends NavigationProps {
  screen: string;
  icon: string;
}

export const ChangeScreen = (props: Props) => {
  return (
    <ChangeScreenWrapper>
      <Row>
        {props.navigation.state.routeName !== ACCOUNT_SCREEN && (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(ACCOUNT_SCREEN)}
          >
            <MaterialIcons
              name="account-circle"
              color={colors.main}
              size={30}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => props.navigation.navigate(props.screen)}
        >
          <MaterialIcons name={props.icon} color={colors.main} size={30} />
        </TouchableOpacity>
      </Row>
    </ChangeScreenWrapper>
  );
};

export default withNavigation(ChangeScreen);
