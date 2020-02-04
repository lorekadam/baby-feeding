import React, { useState, useEffect } from "react";
import { updateLocalStorage, getLocalStorage } from "../utils";
import { useImmer } from "use-immer";
import { HocProps } from "../types";

interface State {
  dateStart: string;
  timeStart: string;
  timeInterval: any;
  seconds: number;
  play: boolean;
  active: boolean;
  setSeconds?(seconds: State["seconds"]): void;
  setDateTime?(
    dateStart: State["dateStart"],
    timeStart: State["timeStart"]
  ): void;
  setActive?(active: State["active"]): void;
  startTimer?(): void;
  stopTimer?(): void;
}

const initialState: State = {
  dateStart: null,
  timeStart: null,
  timeInterval: null,
  seconds: 0,
  play: false,
  active: true
};

const TimerContext = React.createContext(initialState);
const { Provider, Consumer } = TimerContext;

const TimerProvider = (props: HocProps) => {
  const [state, updateState] = useImmer(initialState);

  useEffect(() => {
    const getData = async () => {
      const storageState = await getLocalStorage("timerStore");
      if (storageState !== null) {
        updateState(() => {
          return { ...JSON.parse(storageState), timeInterval: null };
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const update = async () => {
      await updateLocalStorage("timerStore", state);
    };
    update();
  }, [state]);

  const setSeconds: State["setSeconds"] = seconds => {
    updateState((draft: State) => {
      draft.seconds = seconds;
    });
  };

  const setDateTime: State["setDateTime"] = (dateStart, timeStart) => {
    updateState((draft: State) => {
      draft.dateStart = dateStart;
      draft.timeStart = timeStart;
    });
  };

  const setActive: State["setActive"] = active => {
    updateState((draft: State) => {
      draft.active = active;
    });
  };

  const startTimer: State["startTimer"] = () => {
    const timeInterval = setInterval(() => {
      updateState((draft: State) => {
        draft.seconds = draft.seconds + 1;
      });
    }, 1000);
    updateState((draft: State) => {
      draft.timeInterval = timeInterval;
      draft.play = true;
    });
  };

  const stopTimer = () => {
    clearInterval(state.timeInterval);
    updateState(() => initialState);
  };

  return (
    <Provider
      value={{
        ...state,
        setSeconds,
        setDateTime,
        setActive,
        startTimer,
        stopTimer
      }}
    >
      {props.children}
    </Provider>
  );
};

export { TimerProvider, Consumer as TimerConsumer, TimerContext };
