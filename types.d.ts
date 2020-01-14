import { NavigationScreenProp } from "react-navigation";

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface Feeding {
  side: string;
  dateStart: string;
  timeStart: string;
  timeEnd: string;
  duration: string;
  both: boolean;
}

export interface FeedingItem {
  item: Feeding;
  index: number;
}
