import styled from "styled-components/native";
import { colors } from "./colors";
import { heightPtoDP } from "../utils";
import { APP_RADIUS } from "../globals";

export const ScreenWrapper = styled.View`
  display: flex;
  flex: 1;
  background-color: ${colors.main};
  padding: ${heightPtoDP(3)}px;
  position: relative;
`;

export const ScreenRadiusBox = styled.View`
  display: flex;
  flex: 1;
  background-color: ${colors.white};
  padding: ${heightPtoDP(3)}px;
  border-radius: ${APP_RADIUS};
`;

export const ChangeScreenWrapper = styled.View`
  position: absolute;
  z-index: 1;
  right: 8;
  top: 6;
`;

export const AdBannerWrapper = styled.View`
  bottom: 0;
  position: absolute;
`;
