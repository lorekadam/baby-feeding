import React from "react";
import * as Facebook from "expo-facebook";
import { MyText } from "../../styles/Text";
import { theme } from "../../styles/colors";
import { MyButton } from "../../styles/Buttons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import { Row } from "../../styles/Grid";

export const FacebookSignInService = () => {
  const logInFacebook = async () => {
    await Facebook.initializeAsync("633872040777305", "BabyFeeding");
    try {
      const { type, token } = (await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      })) as any;
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            // Handle Errors here.
            console.log(error);
          });
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <MyButton onPress={logInFacebook}>
      <Row>
        <MyText marginRight={10}>Log in with facebook</MyText>
        <AntDesign
          color={theme.Account.main}
          name="facebook-square"
          size={22}
        />
      </Row>
    </MyButton>
  );
};

export default FacebookSignInService;
