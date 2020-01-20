import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../styles/colors";

interface Props {
  color?: string;
}

export const Loader = (props: Props) => (
  <ActivityIndicator animating={true} color={colors.main} />
);

export default Loader;
