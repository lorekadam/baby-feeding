import styled from "styled-components/native";
import { APP_RADIUS } from "../globals";
import { Theme } from "../types";

interface Props extends Theme {
  active?: boolean;
  small?: boolean;
  borderColor?: string;
  round?: boolean;
  position?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  m?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const MyButton = styled.TouchableOpacity`
  margin: ${(props: Props) =>
    props.m !== undefined ? `${props.m}px` : `20px`};
  border: ${(props: Props) =>
    `${props.small ? 2 : 3}px solid ${
      props.borderColor ? props.borderColor : props.theme.main
    };`};
  padding: ${(props: Props) =>
    props.round
      ? `${props.small ? `3px` : `10px`}`
      : `${props.small ? `2px 3px` : `5px 10px`}`};
  border-radius: ${(props: Props) => (props.round ? 700 : APP_RADIUS)};
  display: flex;
  align-items: center;
  ${(props: Props) => props.active && `background-color: ${props.theme.main};`}
  ${(props: Props) => props.position && `position: ${props.position};`}
  ${(props: Props) => props.top && `top: ${props.top};`}
  ${(props: Props) => props.right && `right: ${props.right};`}
  ${(props: Props) => props.bottom && `bottom: ${props.bottom};`}
  ${(props: Props) => props.left && `left: ${props.left};`}
  ${(props: Props) => props.marginTop && `margin-top: ${props.marginTop}`}
    ${(props: Props) =>
      props.marginRight && `margin-right: ${props.marginRight}`}
  ${(props: Props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}`}
    ${(props: Props) => props.marginLeft && `margin-left: ${props.marginLeft}`}
  z-index: 1;
`;

export const Pill = styled.TouchableOpacity`
  border-radius: ${APP_RADIUS};
  padding: 3px 8px;
  background-color: ${(props: Props) => props.theme.main};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 2px;
  margin-bottom: 2px;
`;
