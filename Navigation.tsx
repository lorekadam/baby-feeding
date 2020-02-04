import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import BreastScreen from "./screens/BreastScreen";
import HistoryScreen from "./screens/HistoryScreen";
import * as types from "./screens/types";
import AccountScreen from "./screens/AccountScreen";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MilkScreen from "./screens/FormulaScreen";
import FoodScreen from "./screens/FoodScreen";
import { theme } from "./styles/colors";
import TabBarComponent from "./components/TabBarComponent";
import Milk from "./components/BarIcons/Milk";
import Food from "./components/BarIcons/Food";

const TabNavigator = createMaterialTopTabNavigator(
  {
    [types.ACCOUNT_SCREEN]: AccountScreen,
    [types.MILK_SCREEN]: MilkScreen,
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
        let iconName = null;
        let IconComponent = null;
        if (routeName === types.ACCOUNT_SCREEN) {
          IconComponent = Feather;
          iconName = "user";
        } else if (routeName === types.MILK_SCREEN) {
          IconComponent = Milk;
          iconName = "bottle-wine";
        } else if (routeName === types.BREAST_SCREEN) {
          IconComponent = Feather;
          iconName = "circle";
        } else if (routeName === types.FOOD_SCREEN) {
          IconComponent = Food;
          iconName = "food-variant";
        } else if (routeName === types.HISTORY_SCREEN) {
          IconComponent = MaterialCommunityIcons;
          iconName = "history";
        }

        tintColor = focused
          ? theme[routeName].tabIconActive
          : theme[routeName].tabIcon;

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

export default createAppContainer(TabNavigator);
