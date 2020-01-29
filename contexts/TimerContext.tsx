import React from "react";
import { updateLocalStorage, getLocalStorage } from "../utils";

interface State {
  play: boolean;
  seconds: number;
  timeInterval: any;
  active: boolean;
  dateStart: string;
  timeStart: string;
  setSeconds?(seconds: number): void;
  setTimer?(data: Partial<State>): void;
  startTimer?(): void;
  stopTimer?(): void;
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

  componentDidMount = async () => {
    const storageState = await getLocalStorage("timerStorage");
    if (storageState !== null) {
      this.setState({ ...JSON.parse(storageState), timeInterval: null });
    }
  };

  setSeconds = (seconds: State["seconds"]) => {
    this.setState({ seconds }, async () => {
      await updateLocalStorage("timerStorage", this.state);
    });
  };

  setTimer = (data: Partial<State>) => {
    this.setState({ ...data }, async () => {
      await updateLocalStorage("timerStorage", this.state);
    });
  };

  startTimer = () => {
    const timeInterval = setInterval(() => {
      this.setState((state: State) => ({
        seconds: state.seconds + 1
      }));
    }, 1000);
    this.setState({ timeInterval, play: true });
  };

  stopTimer = () => {
    clearInterval(this.state.timeInterval);
    this.setState(initialState);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setSeconds: this.setSeconds,
          setTimer: this.setTimer,
          startTimer: this.startTimer,
          stopTimer: this.stopTimer
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { TimerProvider, Consumer as TimerConsumer, TimerContext };
