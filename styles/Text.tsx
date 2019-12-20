import styled from "styled-components/native";
import { colors } from "./colors";
import { heightPtoDP as hp } from "../utils";

interface Props {
  color?: string;
  fontSize?: number;
  textAlign?: string;
  light?: boolean;
  bold?: boolean;
}

export const MyText = styled.Text`
  color: ${(props: Props) => (props.color ? props.color : colors.main)};
  font-size: ${(props: Props) => (props.fontSize ? hp(props.fontSize) : hp(2))};
  font-family: nunito;
  ${(props: Props) => props.light && "font-family: nunitoLight"}
  ${(props: Props) => props.bold && "font-family: nunitoSemiBold"}
  text-align: ${(props: Props) => (props.textAlign ? props.textAlign : "left")};
`;
