import React from "react";
import { AsyncStorage } from "react-native";
import { Feeding, FeedingSave } from "../types";
import { updateLocalStorage, getLocalStorage } from "../utils";

interface Timer {
  dateStart: string;
  timeStart: string;
}

interface State {
  changed: boolean;
  both: boolean;
  side: string | null;
  feedings: Feeding[];
  timer: Timer;
  setBoth?(): void;
  setSide?(side: string): void;
  setFeedingLog?(feeding: FeedingSave): void;
  removeFeedingLog?(index: number): void;
  setTimer?(timer: Timer): void;
}

const initialState: State = {
  changed: false,
  both: false,
  side: null,
  feedings: [],
  timer: null
};

const FeedingContext = React.createContext(initialState);
const { Provider, Consumer } = FeedingContext;

class FeedingProvider extends React.Component {
  state = initialState;

  componentDidMount = async () => {
    const storageState = await getLocalStorage("feedingStorage");
    if (storageState !== null) {
      this.setState(JSON.parse(storageState));
    }
  };

  setBoth = () => {
    this.setState(
      (prevState: State) => ({ both: !prevState.both }),
      async () => {
        await updateLocalStorage("feedingStorage", this.state);
      }
    );
  };

  setSide = (side: State["side"]) => {
    this.setState({ changed: true, side }, async () => {
      await updateLocalStorage("feedingStorage", this.state);
    });
  };

  setFeedingLog = (feedingSave: FeedingSave) => {
    const { side, both, timer } = this.state;
    const feeding: Feeding = {
      ...feedingSave,
      side,
      both,
      ...timer
    };
    this.setState(
      (prevState: State) => ({
        changed: false,
        both: false,
        side: null,
        feedings: [feeding, ...prevState.feedings],
        timer: null
      }),
      async () => {
        await updateLocalStorage("feedingStorage", this.state);
      }
    );
  };

  removeFeedingLog = (index: number) => {
    const feedings = this.state.feedings;
    feedings.splice(index, 1);
    this.setState(
      (prevState: State) => ({
        changed: false,
        both: false,
        side: feedings.length === 0 ? null : prevState.side,
        feedings
      }),
      async () => {
        await updateLocalStorage("feedingStorage", this.state);
      }
    );
  };

  setTimer = (timer: Timer) => {
    this.setState({ ...this.state, timer }, async () => {
      await updateLocalStorage("feedingStorage", this.state);
    });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setBoth: this.setBoth,
          setSide: this.setSide,
          setFeedingLog: this.setFeedingLog,
          removeFeedingLog: this.removeFeedingLog,
          setTimer: this.setTimer
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
