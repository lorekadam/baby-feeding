import React from "react";
import { updateLocalStorage } from "../utils";

interface State {
  play: boolean;
  seconds: number;
  timeInterval: any;
  active: boolean;
  dateStart: string;
  timeStart: string;
  setSeconds?(seconds: number): void;
  setTimer?(data: Partial<State>): void;
}

const initialState: State = {
  play: false,
  seconds: 0,
  timeInterval: null,
  active: true,
  dateStart: null,
  timeStart: null
};

const TimerContext = React.createContext(initialState);
const { Provider, Consumer } = TimerContext;

class TimerProvider extends React.Component {
  state = initialState;

  componentDidUpdate = (_, prevState: State) => {
    if (prevState.play === false && this.state.play) {
      const timeInterval = setInterval(() => {
        this.setState((state: State) => ({
          ...state,
          seconds: state.seconds + 1
        }));
      }, 1000);
      this.setState(state => ({ ...state, timeInterval }));
    }

    if (prevState.play && this.state.play === false) {
      clearInterval(this.state.timeInterval);
      this.setState(state => ({
        ...state,
        seconds: 0
      }));
    }
  };

  setSeconds = (seconds: State["seconds"]) => {
    this.setState({ ...this.state, seconds }, async () => {
      await updateLocalStorage("timerStorage", this.state);
    });
  };

  setTimer = (data: Partial<State>) => {
    console.log(data);
    this.setState({ ...this.state, ...data }, async () => {
      console.log(this.state);
      await updateLocalStorage("timerStorage", this.state);
    });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setSeconds: this.setSeconds,
          setTimer: this.setTimer
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { TimerProvider, Consumer as TimerConsumer, TimerContext };
