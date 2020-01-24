import { NavigationScreenProp } from "react-navigation";
import { ColorScheme } from "./contexts/MyThemeContext";

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface Feeding {
  side?: string;
  dateStart: string;
  timeStart: string;
  timeEnd: string;
  duration: string;
  both: boolean;
  type: string;
  amount?: number;
  product?: string;
}

export interface FeedingItem {
  item: Feeding;
  index: number;
}

export interface FeedingSave {
  timeEnd: string;
  duration: string;
}

export interface Theme {
  theme: ColorScheme;
}
