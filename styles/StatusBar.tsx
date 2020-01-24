import styled from "styled-components/native";
import Constants from "expo-constants";
import { colors } from "./colors";

export const StatusBar = styled.View`
  background-color: ${props => props.theme.main};
  height: ${Constants.statusBarHeight};
`;
