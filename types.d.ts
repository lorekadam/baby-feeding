import { NavigationScreenProp } from "react-navigation";
import { ColorScheme } from "./contexts/MyThemeContext";
import { ReactNode } from "react";

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface HocProps {
  children: ReactNode;
}

export interface Feeding {
  dateStart: string;
  timeStart: string;
  type: string;
  side?: string;
  timeEnd?: string;
  duration?: string;
  both?: boolean;
  milkType?: MilkType;
  mililitres?: string;
  scoops?: string;
  product?: string;
  amount?: string;
}

export interface FeedingItem {
  item: Feeding;
  index: number;
}

export type MilkType = "FORMULA_MILK" | "BREAST_MILK";

export interface FeedingSave {
  dateStart: string;
  timeStart: string;
  type: string;
  timeEnd?: string;
  duration?: string;
}

export interface Theme {
  theme: ColorScheme;
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
};
