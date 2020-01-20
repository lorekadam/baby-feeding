import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import PreviousScreen from "./screens/PastFeedsScreen";
import * as types from "./screens/types";
import AccountScreen from "./screens/AccountScreen";

const TabNavigator = createStackNavigator(
  {
    [types.FEED_SCREEN]: HomeScreen,
    [types.PAST_FEEDS]: PreviousScreen,
    [types.ACCOUNT]: AccountScreen
  },
  {
    initialRouteName: types.FEED_SCREEN,
    headerMode: "none"
  }
);

export default createAppContainer(TabNavigator);
