import React, { useContext, useState, useEffect } from "react";
import { SvgCss } from "react-native-svg";
import { CenteredView, ViewFlex } from "../styles/Views";
import MilkType from "./MilkType";
import { FeedingContext } from "../contexts/FeedingContext";
import ValueInput from "./ValueInput";
import { FORMULA_MILK } from "../globals";
import { Row, Col } from "../styles/Grid";
import { MilkSvg } from "./BarIcons/Icons";
import { MyButton } from "../styles/Buttons";
import { MaterialIcons } from "@expo/vector-icons";
import { FeedingSave } from "../types";
import { theme } from "../styles/colors";
import { MILK_SCREEN } from "../screens/types";
import dayjs from "dayjs";
import { LayoutChangeEvent, Keyboard } from "react-native";

export const Milk = () => {
  const [height, setHeight] = useState(0);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const feedingContext = useContext(FeedingContext);
  const {
    milkType,
    mililitres,
    scoops,
    setMilkType,
    setMililitres,
    setScoops,
    setFeedingLog
  } = feedingContext;

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboard(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboard(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const saveLog = () => {
    const data: FeedingSave = {
      dateStart: dayjs().format("DD-MM-YYYY"),
      timeStart: dayjs().format("HH:mm:ss"),
      type: milkType
    };
    setFeedingLog(data);
  };

  const bottleHeight = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    setHeight(height - height * 0.2);
  };

  return (
    <CenteredView>
      <ViewFlex onLayout={bottleHeight}>
        <CenteredView>
          <SvgCss
            xml={MilkSvg(theme[MILK_SCREEN].main)}
            width={height}
            height={height}
          />
        </CenteredView>
      </ViewFlex>
      <ViewFlex>
        <MilkType type={milkType} setMilkType={setMilkType} />
        {milkType && (
          <Row gutters>
            <Col gutters>
              <ValueInput
                value={mililitres}
                setValue={setMililitres}
                label="Mililitres"
                placeholder="Mililitres..."
                numeric={true}
              />
            </Col>
            {milkType === FORMULA_MILK && (
              <Col gutters>
                <ValueInput
                  value={scoops}
                  setValue={setScoops}
                  label="Scoops"
                  placeholder="scoops..."
                  numeric={true}
                />
              </Col>
            )}
          </Row>
        )}
        {isKeyboard === false && mililitres !== null && mililitres.length > 0 && (
          <Row justifyContent="center">
            <MyButton round onPress={saveLog}>
              <MaterialIcons
                name="add"
                color={theme[MILK_SCREEN].font}
                size={40}
              />
            </MyButton>
          </Row>
        )}
      </ViewFlex>
    </CenteredView>
  );
};

export default Milk;
