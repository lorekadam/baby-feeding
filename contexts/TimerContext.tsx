import React from "react";
import { updateLocalStorage } from "../utils";

interface State {
  play: boolean;
  seconds: number;
  timeInterval: any;
  active: boolean;
  setSeconds?(seconds: number): void;
}

const initialState: State = {
  play: false,
  seconds: 0,
  timeInterval: null,
  active: true
};

const TimerContext = React.createContext(initialState);
const { Provider, Consumer } = TimerContext;

class UserProvider extends React.Component {
  state = initialState;

  setSeconds = (seconds: State["seconds"]) => {
    this.setState({ seconds }, async () => {
      await updateLocalStorage("userStorage", this.state);
    });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setSeconds: this.setSeconds
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { UserProvider, Consumer as FeedingConsumer, TimerContext };
