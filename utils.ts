import { Dimensions, PixelRatio } from "react-native";

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

export const returnTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${minutes >= 10 ? minutes : `0${minutes}`}:${
    sec >= 10 ? sec : `0${sec}`
  }`;
};

export const IndexKeyExtractor = (item: any, index: number) => `${index}`;
