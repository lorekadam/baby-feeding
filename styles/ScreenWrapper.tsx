import styled from "styled-components/native";
import { colors } from "./colors";
import { heightPtoDP } from "../utils";
import { APP_RADIUS } from "../globals";

export const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  background-color: ${colors.main};
  padding: ${heightPtoDP(3)}px;
`;

export const ScreenRadiusBox = styled.View`
  display: flex;
  flex: 1;
  background-color: ${colors.white};
  padding: ${heightPtoDP(3)}px;
  border-radius: ${APP_RADIUS};
`;
