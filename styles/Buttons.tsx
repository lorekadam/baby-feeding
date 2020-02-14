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
}

export const MyButton = styled.TouchableOpacity`
  margin: 20px;
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
  z-index: 1;
`;
