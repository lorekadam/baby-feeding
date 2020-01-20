import React from "react";
import { Text } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";

export default class GoogleSignInService extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId:
        "311540481191-l48n7smq222icn2f5h1rhka2ogo7koc7.apps.googleusercontent.com"
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log(user);
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return <Text onPress={this.onPress}>Toggle Auth</Text>;
  }
}
