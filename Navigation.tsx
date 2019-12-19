import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "./screens/HomeScreen";
import PreviousScreen from "./screens/PastFeedsScreen";
import { colors } from "./styles/colors";
import * as types from "./screens/types";

const TabNavigator = createBottomTabNavigator(
  {
    [types.FEED_SCREEN]: HomeScreen,
    [types.PAST_FEEDS]: PreviousScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === types.FEED_SCREEN) {
          iconName = `md-checkmark${focused ? "-circle-outline" : ""}`;
        } else if (routeName === types.PAST_FEEDS) {
          iconName = `md-list`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.main,
      inactiveTintColor: colors.darkText
    }
  }
);

export default createAppContainer(TabNavigator);
