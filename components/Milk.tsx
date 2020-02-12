import React, { useContext } from "react";
import { SvgCss } from "react-native-svg";
import { CenteredView } from "../styles/Views";
import MilkType from "./MilkType";
import { FeedingContext } from "../contexts/FeedingContext";
import NumericValueInput from "./NumericValueInput";
import { FORMULA_MILK } from "../globals";
import { Row, Col } from "../styles/Grid";
import { MilkSvg } from "./BarIcons/Icons";
import { MyButton } from "../styles/Buttons";
import { MaterialIcons } from "@expo/vector-icons";
import { FeedingSave } from "../types";
import { theme } from "../styles/colors";
import { MILK_SCREEN } from "../screens/types";
import dayjs from "dayjs";

export const Milk = () => {
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

  const saveLog = () => {
    const data: FeedingSave = {
      dateStart: dayjs().format("DD-MM-YYYY"),
      timeStart: dayjs().format("HH:mm:ss"),
      type: milkType
    };
    setFeedingLog(data);
  };

  return (
    <CenteredView>
      <SvgCss xml={MilkSvg(theme[MILK_SCREEN].main)} width="60%" height="60%" />
      <MilkType type={milkType} setMilkType={setMilkType} />
      {milkType && (
        <React.Fragment>
          <Row gutters>
            <Col gutters>
              <NumericValueInput
                value={mililitres}
                setValue={setMililitres}
                label="ml"
                placeholder="Mililitres..."
              />
            </Col>
            {milkType === FORMULA_MILK && (
              <Col gutters>
                <NumericValueInput
                  value={scoops}
                  setValue={setScoops}
                  label="scoops"
                  placeholder="scoops..."
                />
              </Col>
            )}
          </Row>
          {mililitres && (
            <MyButton round onPress={saveLog}>
              <MaterialIcons
                name="add"
                color={theme[MILK_SCREEN].font}
                size={40}
              />
            </MyButton>
          )}
        </React.Fragment>
      )}
    </CenteredView>
  );
};

export default Milk;
