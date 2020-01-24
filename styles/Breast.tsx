import styled from "styled-components/native";
import { colors } from "./colors";
import { Theme } from "../types";

interface Props extends Theme {
  rightSide?: boolean;
  scale?: boolean;
  active?: string;
  height: number;
}

export const BreastOutside = styled.View`
  position: absolute;
  background-color: ${colors.breast};
  left: 50%;
  margin-left: ${(props: Props) =>
    props.height ? (props.height / 2) * -1 : 0}px;
  width: ${(props: Props) => props.height};
  height: ${(props: Props) => props.height};
  border-radius: ${(props: Props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: Props) =>
    props.active &&
    `
      border-left-width:10px;
      border-left-color:${colors.breastShadow};
    `}
`;

export const BreastInside = styled.View`
  margin-top: 30px;
  background-color: ${colors.breastInside};
  z-index: 1;
  width: ${(props: Props) => props.height / 3.4};
  height: ${(props: Props) => props.height / 3.4};
  border-radius: ${(props: Props) => props.height};
  ${(props: Props) =>
    props.active &&
    `
      border-left-width:10px;
      border-left-color:${colors.breastInsideShadow};
    `}
`;

export const Side = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  z-index: 1;
  height: 100%;
`;

export const TapSide = styled.View`
  flex: 1;
`;
