import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { heightPtoDP } from "../utils";
import { colors } from "./colors";
import { BREAST_SCALE } from "../globals";

const breastWidth = Dimensions.get("window").width - 4 * heightPtoDP(3);
const breastInsideWidth = breastWidth / 3.4;

interface Props {
  rightSide?: boolean;
  scale?: boolean;
  active?: boolean;
}

const countScale = (value: number, scale?: boolean) => {
  return scale ? value * BREAST_SCALE : value;
};

export const BreastOutside = styled.View`
  background-color: ${colors.breast};
  width: ${(props: Props) => countScale(breastWidth, props.scale)};
  height: ${(props: Props) => countScale(breastWidth, props.scale)};
  border-radius: ${breastWidth};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props: Props) =>
    props.active && `border:6px solid ${colors.breastShadow};`}
`;

export const BreastInside = styled.View`
  background-color: ${colors.breastInside};
  z-index: 1;
  width: ${(props: Props) => countScale(breastInsideWidth, props.scale)};
  height: ${(props: Props) => countScale(breastInsideWidth, props.scale)};
  border-radius: ${breastInsideWidth};
  ${(props: Props) =>
    props.active && `border:6px solid ${colors.breastInsideShadow};`}
`;

export const Side = styled.View`
  display: flex;
  flex: 1;
  overflow: hidden;
  ${(props: Props) => props.rightSide && `align-items:flex-end;`}
  justify-content:center;
`;
