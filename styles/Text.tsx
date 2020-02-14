import styled from "styled-components/native";
import { heightPtoDP as hp } from "../utils";
import { Theme } from "../types";

interface Props extends Theme {
  flex?: boolean;
  color?: string;
  fontSize?: number;
  textAlign?: string;
  light?: boolean;
  bold?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  alignItems?: string;
  justifyContent?: string;
  transform?: boolean;
}

export const MyText = styled.Text`
  color: ${(props: Props) => (props.color ? props.color : props.theme.main)};
  font-size: ${(props: Props) => (props.fontSize ? hp(props.fontSize) : hp(2))};
  font-family: nunito;
  ${(props: Props) => props.light && "font-family: nunitoLight"}
  ${(props: Props) => props.bold && "font-family: nunitoSemiBold"}
  text-align: ${(props: Props) => (props.textAlign ? props.textAlign : "left")};
  ${(props: Props) => props.marginTop && `margin-top: ${props.marginTop}`}
    ${(props: Props) =>
      props.marginRight && `margin-right: ${props.marginRight}`}
  ${(props: Props) =>
    props.marginBottom && `margin-bottom: ${props.marginBottom}`}
    ${(props: Props) => props.marginLeft && `margin-left: ${props.marginLeft}`}
    ${(props: Props) => props.flex && "display: flex"}
    ${(props: Props) => props.alignItems && `align-items:${props.alignItems}`};
  ${(props: Props) =>
    props.justifyContent && `justify-content:${props.justifyContent}`};
    ${(props: Props) => props.transform && `text-transform:${props.transform}`};
`;
