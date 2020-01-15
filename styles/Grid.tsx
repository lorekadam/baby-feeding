import styled from "styled-components/native";
import { APP_GUTTER } from "../globals";

interface Props {
  alignItems?: string;
  justifyContent?: string;
  flex?: number;
  gutters?: boolean;
  gutterBottom?: boolean;
}

export const Aligment = styled.View`
  ${(props: Props) => props.alignItems && `align-items:${props.alignItems}`};
  ${(props: Props) =>
    props.justifyContent && `justify-content:${props.justifyContent}`};
  ${(props: Props) => props.flex && `flex:${props.flex}`};
`;

export const Row = styled(Aligment)`
  display: flex;
  flex-direction: row;
  ${(props: Props) => props.gutters && `margin:0 -${APP_GUTTER}px`};
`;

export const RowColumn = styled(Aligment)`
  display: flex;
  flex-direction: column;
  background: red;
  flex: 1;
`;

export const Col = styled(Aligment)`
  ${(props: Props) => (props.flex ? `flex:${props.flex}` : "flex:1")};
  ${(props: Props) => props.gutters && `padding:0 ${APP_GUTTER}px`};
  ${(props: Props) =>
    props.gutterBottom && `padding-bottom:${2 * APP_GUTTER}px`};
`;
