import React from "react";
import { AsyncStorage } from "react-native";
import { Feeding, FeedingSave } from "../types";
import {
  updateLocalStorage,
  getLocalStorage,
  findIndexToRemove
} from "../utils";
import { addFeedingAPI, removeFeedingAPI, userIsLogged } from "../firebase/api";

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
  toSend: Feeding[];
  toRemove: Feeding[];
  setBoth?(): void;
  setSide?(side: string): void;
  setFeedingLog?(feeding: FeedingSave, user?: string): void;
  removeFeedingLog?(index: number): void;
  setTimer?(timer: Timer): void;
  clearToSend?(): void;
  clearToRemove?(): void;
}

const initialState: State = {
  changed: false,
  both: false,
  side: null,
  feedings: [],
  toSend: [],
  toRemove: [],
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
        feedings: [...prevState.feedings, feeding],
        toSend: userIsLogged() ? [] : [...prevState.toSend, feeding],
        timer: null
      }),
      async () => {
        addFeedingAPI(feeding);
        await updateLocalStorage("feedingStorage", this.state);
      }
    );
  };

  removeFeedingLog = (index: number) => {
    const { toSend, feedings } = this.state;
    const removeIndex = feedings.length - index - 1;
    const removedElement = feedings.splice(removeIndex, 1);
    if (toSend.length > 0) {
      toSend.splice(findIndexToRemove(toSend, removedElement[0]), 1);
    }
    this.setState(
      (prevState: State) => ({
        changed: false,
        both: false,
        side: feedings.length === 0 ? null : prevState.side,
        feedings,
        toSend,
        toRemove: userIsLogged()
          ? []
          : [...prevState.toRemove, removedElement[0]]
      }),
      async () => {
        removeFeedingAPI(removedElement[0]);
        await updateLocalStorage("feedingStorage", this.state);
      }
    );
  };

  setTimer = (timer: Timer) => {
    this.setState({ ...this.state, timer }, async () => {
      await updateLocalStorage("feedingStorage", this.state);
    });
  };

  clearToSend = () => {
    this.setState({ ...this.state, toSend: [] }, async () => {
      await updateLocalStorage("feedingStorage", this.state);
    });
  };

  clearToRemove = () => {
    this.setState({ ...this.state, toRemove: [] }, async () => {
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
          setTimer: this.setTimer,
          clearToSend: this.clearToSend,
          clearToRemove: this.clearToRemove
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
