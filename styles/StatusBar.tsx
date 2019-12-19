import styled from "styled-components/native";
import Constants from "expo-constants";
import { colors } from "./colors";

export const StatusBar = styled.View`
  background-color: ${colors.main};
  height: ${Constants.statusBarHeight};
`;
