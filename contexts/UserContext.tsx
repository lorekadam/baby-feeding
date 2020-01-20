import React from "react";
import { updateLocalStorage } from "../utils";

interface User {
  uid: string;
  name: string;
  photo: string;
}

interface State {
  user: User;
  setUser?(user: User): void;
  logOut?(): void;
}

const initialState: State = {
  user: {
    uid: null,
    name: null,
    photo: null
  }
};

const UserContext = React.createContext(initialState);
const { Provider, Consumer } = UserContext;

class UserProvider extends React.Component {
  state = initialState;

  setUser = (user: User) => {
    this.setState({ user }, async () => {
      await updateLocalStorage("userStorage", this.state);
    });
  };

  logOut = () => {
    this.setState({ ...initialState }, async () => {
      await updateLocalStorage("userStorage", this.state);
    });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setUser: this.setUser,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { UserProvider, Consumer as FeedingConsumer, UserContext };
