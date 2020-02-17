import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import BreastScreen from "./screens/BreastScreen";
import HistoryScreen from "./screens/HistoryScreen";
import * as types from "./screens/types";
import AccountScreen from "./screens/AccountScreen";
import MilkScreen from "./screens/MilkScreen";
import FoodScreen from "./screens/FoodScreen";
import { theme } from "./styles/colors";
import TabBarComponent from "./components/TabBarComponent";
import SvgIcon from "./components/BarIcons/SvgIcon";
import {
  FoodSvg,
  MilkSvg,
  UserSvg,
  HistorySvg,
  BreastSvg
} from "./components/BarIcons/Icons";

const TabNavigator = createMaterialTopTabNavigator(
  {
    [types.ACCOUNT_SCREEN]: AccountScreen,
    [types.MILK_SCREEN]: MilkScreen,
    [types.BREAST_SCREEN]: BreastScreen,
    [types.FOOD_SCREEN]: FoodScreen,
    [types.HISTORY_SCREEN]: HistoryScreen
  },
  {
    initialRouteName: types.FOOD_SCREEN,
    tabBarPosition: "bottom",
    tabBarComponent: TabBarComponent,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = null;
        let svg = null;
        if (routeName === types.ACCOUNT_SCREEN) {
          IconComponent = SvgIcon;
          svg = UserSvg;
        } else if (routeName === types.MILK_SCREEN) {
          IconComponent = SvgIcon;
          svg = MilkSvg;
        } else if (routeName === types.BREAST_SCREEN) {
          IconComponent = SvgIcon;
          svg = BreastSvg;
        } else if (routeName === types.FOOD_SCREEN) {
          IconComponent = SvgIcon;
          svg = FoodSvg;
        } else if (routeName === types.HISTORY_SCREEN) {
          IconComponent = SvgIcon;
          svg = HistorySvg;
        }

        tintColor = focused
          ? theme[routeName].tabIconActive
          : theme[routeName].tabIcon;

        return <IconComponent color={tintColor} svg={svg} />;
      }
    })
  }
);

export default createAppContainer(TabNavigator);
