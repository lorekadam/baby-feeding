import styled from "styled-components/native";
import { Theme } from "../types";
import { APP_RADIUS } from "../globals";

interface Props extends Theme {}

export const Input = styled.TextInput`
  border: ${(props: Props) => `3px solid ${props.theme.main}`};
  padding: 2px 10px;
  border-radius: ${APP_RADIUS};
  width: 100%;
`;
