import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import PreviousScreen from "./screens/PastFeedsScreen";
import * as types from "./screens/types";

const TabNavigator = createStackNavigator(
  {
    [types.FEED_SCREEN]: HomeScreen,
    [types.PAST_FEEDS]: PreviousScreen
  },
  {
    initialRouteName: types.PAST_FEEDS,
    headerMode: "none"
  }
);

export default createAppContainer(TabNavigator);
