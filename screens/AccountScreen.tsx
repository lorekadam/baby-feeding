import React, { useContext } from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import ChangeScreen from "../components/ChangeScreen";
import { FEED_SCREEN } from "./types";
import FacebookSignInService from "../components/auth/FacebookSignInService";
import { UserContext } from "../contexts/UserContext";
import LogOut from "../components/auth/LogOut";

interface Props extends NavigationProps {}

export const AccountScreen = (props: Props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  return (
    <BasicScreen>
      <ChangeScreen icon="home" screen={FEED_SCREEN} />
      <MyText textAlign="center" bold fontSize={4}>
        Account
      </MyText>
      {user?.uid ? <LogOut /> : <FacebookSignInService />}
    </BasicScreen>
  );
};

export default AccountScreen;
