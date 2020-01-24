import React, { useContext } from "react";
import BasicScreen from "./BasicScreen";
import { MyText } from "../styles/Text";
import { NavigationProps } from "../types";
import FacebookSignInService from "../components/auth/FacebookSignInService";
import { UserContext } from "../contexts/UserContext";
import LogOut from "../components/auth/LogOut";
import { ACCOUNT_SCREEN } from "./types";

interface Props extends NavigationProps {}

export const AccountScreen = (props: Props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  return (
    <BasicScreen theme={ACCOUNT_SCREEN}>
      <MyText textAlign="center" bold fontSize={4}>
        Account
      </MyText>
      {user?.uid ? (
        <React.Fragment>
          <MyText marginTop={10}>
            Your data is now available on every device with this account.
          </MyText>
          <LogOut />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MyText marginTop={10}>
            After loging in Your feeding data will be available on every device
            with same account.
          </MyText>
          <FacebookSignInService />
        </React.Fragment>
      )}
    </BasicScreen>
  );
};

export default AccountScreen;
