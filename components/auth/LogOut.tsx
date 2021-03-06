import React from "react";
import { MyButton } from "../../styles/Buttons";
import { MyText } from "../../styles/Text";
import firebase from "firebase";

export const LogOut = () => {
  const logOut = () => {
    firebase.auth().signOut();
  };
  return (
    <MyButton onPress={logOut}>
      <MyText>Log out</MyText>
    </MyButton>
  );
};

export default LogOut;
