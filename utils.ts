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
