import React, { useEffect, useState } from "react";
import { updateLocalStorage } from "../utils";
import { HocProps } from "../types";

export interface User {
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

const UserProvider = (props: HocProps) => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const update = async () => {
      await updateLocalStorage("userStorage", state);
    };
    update();
  }, [state]);

  const setUser: State["setUser"] = user => {
    setState({ user });
  };

  const logOut: State["logOut"] = () => {
    setState(initialState);
  };

  return (
    <Provider
      value={{
        ...state,
        setUser,
        logOut
      }}
    >
      {props.children}
    </Provider>
  );
};

export { UserProvider, Consumer as FeedingConsumer, UserContext };
