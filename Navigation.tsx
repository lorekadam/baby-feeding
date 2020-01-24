import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import BreastScreen from "./screens/BreastScreen";
import HistoryScreen from "./screens/HistoryScreen";
import * as types from "./screens/types";
import AccountScreen from "./screens/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import FormulaScreen from "./screens/FormulaScreen";
import FoodScreen from "./screens/FoodScreen";
import { colors } from "./styles/colors";
import TabBarComponent from "./components/TabBarComponent";

const TabNavigator = createMaterialTopTabNavigator(
  {
    [types.ACCOUNT_SCREEN]: AccountScreen,
    [types.FORMULA_SCREEN]: FormulaScreen,
    [types.BREAST_SCREEN]: BreastScreen,
    [types.FOOD_SCREEN]: FoodScreen,
    [types.HISTORY_SCREEN]: HistoryScreen
  },
  {
    initialRouteName: types.BREAST_SCREEN,
    tabBarPosition: "bottom",
    tabBarComponent: TabBarComponent,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === types.BREAST_SCREEN) {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (routeName === types.HISTORY_SCREEN) {
          iconName = focused ? "ios-list-box" : "ios-list";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

export default createAppContainer(TabNavigator);
