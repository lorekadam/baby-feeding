import { Dimensions, PixelRatio, AsyncStorage } from "react-native";

export const widthPtoDP = (widthPercent: number) => {
  const screenWidth = Dimensions.get("window").width;
  const elemWidth = widthPercent;
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPtoDP = (heightPercent: number) => {
  const screenHeight = Dimensions.get("window").height;
  const elemHeight = heightPercent;
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const returnTimeString = (time: number, showBig = true) => {
  const bigValue = Math.floor(time / 60);
  const smallValue = time % 60;
  if (!showBig && bigValue === 0) {
    return `${smallValue}`;
  } else {
    return `${bigValue >= 10 ? bigValue : `0${bigValue}`}:${
      smallValue >= 10 ? smallValue : `0${smallValue}`
    }`;
  }
};

export const IndexKeyExtractor = (item: any, index: number) => `${index}`;

export const updateLocalStorage = async (storage: string, data = {}) => {
  await AsyncStorage.setItem(storage, JSON.stringify(data));
};

export const getLocalStorage = async (storage: string) => {
  return await AsyncStorage.getItem(storage);
};
