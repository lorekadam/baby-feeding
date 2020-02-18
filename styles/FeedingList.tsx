import styled from "styled-components/native";
import { APP_RADIUS } from "../globals";
import { heightPtoDP } from "../utils";
import { Theme } from "../types";

interface Props extends Theme {}

export const FeedingListWrapper = styled.View`
  flex: 1;
  margin-top: ${heightPtoDP(2)}px;
`;

export const FeedingItem = styled.View`
  position: relative;
  border: 2px solid ${(props: Props) => props.theme.main};
  border-radius: ${APP_RADIUS};
  padding: ${heightPtoDP(2)}px;
  margin-bottom: ${heightPtoDP(1)}px;
`;
