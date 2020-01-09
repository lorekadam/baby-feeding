import styled from "styled-components/native";
import { APP_RADIUS } from "../globals";
import { colors } from "./colors";

interface Props {
  active: boolean;
  round?: boolean;
}

export const MyButton = styled.TouchableOpacity`
  margin: 20px;
  border: 3px solid ${colors.main};
  padding: ${(props: Props) => (props.round ? `10px` : `5px 10px`)};
  border-radius: ${(props: Props) => (props.round ? 700 : APP_RADIUS)};
  display: flex;
  align-items: center;
  ${(props: Props) => props.active && `background-color: ${colors.main}`}
`;
