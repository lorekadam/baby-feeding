import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { Feeding, FeedingSave, HocProps, MilkType } from "../types";
import {
  updateLocalStorage,
  getLocalStorage,
  findIndexToRemove
} from "../utils";
import { addFeedingAPI, removeFeedingAPI, userIsLogged } from "../firebase/api";

interface State {
  both?: boolean;
  side?: string | null;
  feedings: Feeding[];
  toSend: Feeding[];
  toRemove: Feeding[];
  milkType?: MilkType | null;
  mililitres?: string | null;
  grams?: string | null;
  product?: string | null;
  amount?: string | null;
  setBoth?(): void;
  setSide?(side: State["side"]): void;
  setFeedingLog?(feeding: FeedingSave, user?: string): void;
  removeFeedingLog?(index: number): void;
  clearToSend?(): void;
  clearToRemove?(): void;
  setFeedings?(feedings: State["feedings"]): void;
  setMilkType?(type: State["milkType"]): void;
  setMililitres?(mililitres: State["mililitres"]): void;
  setGrams?(grams: State["grams"]): void;
  setProduct?(product: State["product"]): void;
  setAmount?(amount: State["amount"]): void;
}

const initialState: State = {
  both: false,
  side: null,
  milkType: null,
  mililitres: null,
  grams: null,
  product: null,
  amount: null,
  feedings: [],
  toSend: [],
  toRemove: []
};

const FeedingContext = React.createContext(initialState);
const { Provider, Consumer } = FeedingContext;

const FeedingProvider = (props: HocProps) => {
  const [state, updateState] = useImmer<State>(() => initialState);

  useEffect(() => {
    const getData = async () => {
      const storageState = await getLocalStorage("feedingStorage");
      if (storageState !== null) {
        updateState(() => {
          return JSON.parse(storageState);
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

  const setBoth: State["setBoth"] = () => {
    updateState((draft: State) => {
      draft.both = !draft.both;
    });
  };

  const setSide: State["setSide"] = side => {
    updateState((draft: State) => {
      draft.side = side;
    });
  };

  const setFeedingLog: State["setFeedingLog"] = feedingSave => {
    const { side, both, milkType, mililitres, grams, product, amount } = state;
    console.log(amount);
    const feeding: Feeding = {
      ...feedingSave,
      side,
      both,
      milkType,
      mililitres,
      grams,
      product,
      amount
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

  const removeFeedingLog: State["removeFeedingLog"] = index => {
    const { toSend, feedings } = state;
    let removedElement: Feeding[];
    updateState((draft: State) => {
      const removeIndex = draft.feedings.length - index - 1;
      removedElement = draft.feedings.splice(removeIndex, 1);
      draft.both = false;
      draft.side = feedings.length === 0 ? null : draft.side;
      draft.toSend = toSend;
      if (userIsLogged()) {
        draft.toRemove = [];
      } else {
        draft.toRemove.push(removedElement[0]);
      }
      if (draft.toSend.length > 0) {
        draft.toSend.splice(
          findIndexToRemove(draft.toSend, removedElement[0]),
          1
        );
      }
      removeFeedingAPI(removedElement[0]);
    });
  };

  const clearToSend: State["clearToSend"] = () => {
    updateState((draft: State) => {
      draft.toSend = [];
    });
  };

  const clearToRemove: State["clearToRemove"] = () => {
    updateState((draft: State) => {
      draft.toRemove = [];
    });
  };

  const setFeedings: State["setFeedings"] = feedings => {
    updateState((draft: State) => {
      draft.feedings = feedings;
    });
  };

  const setMilkType: State["setMilkType"] = milkType => {
    updateState((draft: State) => {
      draft.milkType = milkType;
    });
  };

  const setMililitres: State["setMililitres"] = mililitres => {
    updateState((draft: State) => {
      draft.mililitres = mililitres;
    });
  };
  const setGrams: State["setGrams"] = grams => {
    updateState((draft: State) => {
      draft.grams = grams;
    });
  };
  const setProduct: State["setProduct"] = product => {
    updateState((draft: State) => {
      draft.product = product;
    });
  };
  const setAmount: State["setAmount"] = amount => {
    updateState((draft: State) => {
      draft.amount = amount;
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
        setFeedings,
        setMilkType,
        setMililitres,
        setGrams,
        setProduct,
        setAmount
      }}
    >
      {props.children}
    </Provider>
  );
};

export { FeedingProvider, Consumer as FeedingConsumer, FeedingContext };
