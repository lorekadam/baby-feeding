import styled from "styled-components/native";
import { APP_GUTTER } from "../globals";

interface Props {
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  flex?: number;
  gutters?: boolean;
  gutterBottom?: boolean;
  marginBottom?: number;
}

export const Aligment = styled.View`
  ${(props: Props) => props.alignItems && `align-items:${props.alignItems}`};
  ${(props: Props) =>
    props.justifyContent && `justify-content:${props.justifyContent}`};
  ${(props: Props) => props.flex && `flex:${props.flex}`};
  ${(props: Props) => props.flexWrap && `flex-wrap:${props.flexWrap}`};
`;

export const Row = styled(Aligment)`
  display: flex;
  flex-direction: row;
  ${(props: Props) => props.gutters && `margin:0 -${APP_GUTTER}px`};
  ${(props: Props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}`}
`;

export const RowColumn = styled(Aligment)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Col = styled(Aligment)`
  ${(props: Props) => (props.flex ? `flex:${props.flex}` : "flex:1")};
  ${(props: Props) => props.gutters && `padding:0 ${APP_GUTTER}px`};
  ${(props: Props) =>
    props.gutterBottom && `padding-bottom:${2 * APP_GUTTER}px`};
`;
