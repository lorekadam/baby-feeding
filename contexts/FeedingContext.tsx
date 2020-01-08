import React from "react";

interface State {
  side: string | null;
  feeding: [];
  setSide?(side: string): void;
}

const initialState: State = {
  side: null,
  feeding: []
};

const FeedingContext = React.createContext(initialState);
const { Provider, Consumer } = FeedingContext;

class FeedingProvider extends React.Component {
  state = { ...initialState, side: "LEFT" };

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
