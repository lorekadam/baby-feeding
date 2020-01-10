import React from "react";
import { AsyncStorage } from "react-native";
import { Feeding } from "../types";

interface State {
  changed: boolean;
  side: string | null;
  feedings: Feeding[];
  setSide?(side: string): void;
  setFeedingLog?(feeding: Feeding): void;
}

const initialState: State = {
  changed: false,
  side: null,
  feedings: []
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

  setSide = (side: State["side"]) => {
    this.setState({ changed: true, side }, async () => {
      this.updateLocalStorage();
    });
  };

  setFeedingLog = (feeding: Feeding) => {
    this.setState(
      (prevState: State) => ({
        changed: false,
        feedings: [...prevState.feedings, feeding]
      }),
      () => {
        this.updateLocalStorage();
      }
    );
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setSide: this.setSide,
          setFeedingLog: this.setFeedingLog
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
