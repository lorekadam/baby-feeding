import React from "react";
import { Feeding } from "../types";

interface State {
  side: string | null;
  feeding: Feeding[];
  setSide?(side: string): void;
}

const initialState: State = {
  side: null,
  feeding: [
    {
      side: "LEFT",
      dateTime: "08.01.2020 16:48"
    }
  ]
};

const FeedingContext = React.createContext(initialState);
const { Provider, Consumer } = FeedingContext;

class FeedingProvider extends React.Component {
  state = initialState;

  setSide = (side: string) => {
    this.setState({ side });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setSide: this.setSide
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
