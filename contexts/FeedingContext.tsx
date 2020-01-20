import React from "react";
import { AsyncStorage } from "react-native";
import { Feeding, FeedingSave } from "../types";

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
    const storageState = await AsyncStorage.getItem("storageState");
    if (storageState !== null) {
      this.setState(JSON.parse(storageState));
    }
  };

  updateLocalStorage = async () => {
    await AsyncStorage.setItem("storageState", JSON.stringify(this.state));
  };

  setBoth = () => {
    this.setState(
      (prevState: State) => ({ both: !prevState.both }),
      async () => {
        this.updateLocalStorage();
      }
    );
  };

  setSide = (side: State["side"]) => {
    this.setState({ changed: true, side }, async () => {
      this.updateLocalStorage();
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
      () => {
        this.updateLocalStorage();
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
      () => {
        this.updateLocalStorage();
      }
    );
  };

  setTimer = (timer: Timer) => {
    this.setState({ ...this.state, timer }, async () => {
      this.updateLocalStorage();
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
