import React from "react";
import { SvgCss } from "react-native-svg";

interface Props {
  color: string;
  svg(color: string): string;
}

export const SvgIcon = (props: Props) => {
  return <SvgCss xml={props.svg(props.color)} width="60%" height="60%" />;
};

export default SvgIcon;
