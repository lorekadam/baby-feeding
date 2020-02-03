import React, { useEffect, ReactNode } from "react";
import { useImmer } from "use-immer";
import { Feeding, FeedingSave } from "../types";
import {
  updateLocalStorage,
  getLocalStorage,
  findIndexToRemove
} from "../utils";
import { addFeedingAPI, removeFeedingAPI, userIsLogged } from "../firebase/api";

interface Props {
  children: ReactNode;
}

interface State {
  both: boolean;
  side: string | null;
  feedings: Feeding[];
  toSend: Feeding[];
  toRemove: Feeding[];
  setBoth?(): void;
  setSide?(side: string): void;
  setFeedingLog?(feeding: FeedingSave, user?: string): void;
  removeFeedingLog?(index: number): void;
  clearToSend?(): void;
  clearToRemove?(): void;
  setFeedings?(feedings: Feeding[]): void;
}

const initialState: State = {
  both: false,
  side: null,
  feedings: [],
  toSend: [],
  toRemove: []
};

const FeedingContext = React.createContext(initialState);
const { Provider, Consumer } = FeedingContext;

const FeedingProvider = (props: Props) => {
  const [state, updateState] = useImmer<State>(() => initialState);

  useEffect(() => {
    const getData = async () => {
      const storageState = await getLocalStorage("feedingStorage");
      if (storageState !== null) {
        updateState((draft: State) => {
          draft = JSON.parse(storageState);
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const update = async () => {
      await updateLocalStorage("feedingStorage", state);
    };
    update();
  }, [state]);

  const setBoth = () => {
    updateState((draft: State) => {
      draft.both = !draft.both;
    });
  };

  const setSide = (side: State["side"]) => {
    updateState((draft: State) => {
      draft.side = side;
    });
  };

  const setFeedingLog = (feedingSave: FeedingSave) => {
    const { side, both } = state;
    const feeding: Feeding = {
      ...feedingSave,
      side,
      both
    };
    updateState((draft: State) => {
      draft.both = false;
      draft.side = null;
      draft.feedings.push(feeding);
      if (userIsLogged()) {
        draft.toSend = [];
      } else {
        draft.toSend.push(feeding);
      }
    });
    addFeedingAPI(feeding);
  };

  const removeFeedingLog = (index: number) => {
    const { toSend, feedings } = state;
    const removeIndex = feedings.length - index - 1;
    const removedElement = feedings.splice(removeIndex, 1);
    if (toSend.length > 0) {
      toSend.splice(findIndexToRemove(toSend, removedElement[0]), 1);
    }
    updateState((draft: State) => {
      draft.both = false;
      draft.side = feedings.length === 0 ? null : draft.side;
      draft.toSend = toSend;
      if (userIsLogged()) {
        draft.toRemove = [];
      } else {
        draft.toRemove.push(removedElement[0]);
      }
    });
    removeFeedingAPI(removedElement[0]);
  };

  const clearToSend = () => {
    updateState((draft: State) => {
      draft.toSend = [];
    });
  };

  const clearToRemove = () => {
    updateState((draft: State) => {
      draft.toRemove = [];
    });
  };

  const setFeedings = (feedings: Feeding[]) => {
    updateState((draft: State) => {
      draft.feedings = feedings;
    });
  };

  return (
    <Provider
      value={{
        ...state,
        setBoth,
        setSide,
        setFeedingLog,
        removeFeedingLog,
        clearToSend,
        clearToRemove,
        setFeedings
      }}
    >
      {props.children}
    </Provider>
  );
};

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
