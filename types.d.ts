import { NavigationScreenProp } from "react-navigation";

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface Feeding {
  side: string;
  dateTime: string;
}
