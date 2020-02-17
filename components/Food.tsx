import React from "react";
import { MyText } from "../styles/Text";
import { CenteredView, ViewFlex } from "../styles/Views";
import { MaterialIcons } from "@expo/vector-icons";
import { MyButton } from "../styles/Buttons";
import { Row, Col } from "../styles/Grid";
import { theme } from "../styles/colors";
import { FOOD_SCREEN } from "../screens/types";
import {
  AppleSvg,
  BananaSvg,
  MangoSvg,
  PeachSvg,
  PearSvg,
  CarrotSvg,
  PotatoSvg,
  BeetrootSvg,
  PumpkinSvg,
  PeasSvg,
  ChickenSvg,
  TurkeySvg,
  RabbitSvg,
  FishSvg,
  EggSvg
} from "./BarIcons/Icons";
import { SvgCss } from "react-native-svg";

// Fruit: -Apple-, -Banana-, -Mango-, -Peach-, -Pear-, Other
// Vegetables: -Carrot-, -Potato-, -Sweet Potato-, -Pumpkin-, -Peas-, Other
// Meat & Other: Chicken, Turkey, Rabbit, Fish, Eggs, Other

type SvgCall = (color: string) => string;

const fruits: SvgCall[] = [AppleSvg, BananaSvg, MangoSvg, PeachSvg, PearSvg];
const vegetables: SvgCall[] = [
  CarrotSvg,
  PotatoSvg,
  BeetrootSvg,
  PumpkinSvg,
  PeasSvg
];
const meat: SvgCall[] = [ChickenSvg, TurkeySvg, RabbitSvg, FishSvg, EggSvg];

const allFood: SvgCall[][] = [fruits, vegetables, meat];

export const Food = () => {
  const saveLog = () => {
    console.log("save");
  };
  return (
    <CenteredView>
      {allFood.map((foodType, index: number) => (
        <Row key={index}>
          {foodType.map((FruitSvg, index: number) => (
            <Col key={index} alignItems="center">
              <SvgCss
                xml={FruitSvg(theme[FOOD_SCREEN].main)}
                width="80%"
                height="100"
              />
            </Col>
          ))}
        </Row>
      ))}
      <Row justifyContent="center">
        <MyButton round onPress={saveLog}>
          <MaterialIcons name="add" color={theme[FOOD_SCREEN].font} size={40} />
        </MyButton>
      </Row>
    </CenteredView>
  );
};

export default Food;
