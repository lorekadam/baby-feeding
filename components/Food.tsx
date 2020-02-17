import React, { useState } from "react";
import { CenteredView } from "../styles/Views";
import { MaterialIcons } from "@expo/vector-icons";
import { MyButton } from "../styles/Buttons";
import { Row } from "../styles/Grid";
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
import {
  APPLE,
  BANANA,
  MANGO,
  PEACH,
  PEAR,
  CARROT,
  POTATO,
  BEETROOT,
  PUMPKIN,
  PEAS,
  CHICKEN,
  TURKEY,
  RABBIT,
  FISH,
  EGG
} from "../globals";
import { useImmer } from "use-immer";
import { FoodIcon as FoodIconType } from "../types";
import FoodIcon from "./FoodIcon";
import ValueInput from "./ValueInput";
import { MyText } from "../styles/Text";
import FoodElement from "./FoodElement";

const fruits: FoodIconType[] = [
  { svg: AppleSvg, type: APPLE },
  { svg: BananaSvg, type: BANANA },
  { svg: MangoSvg, type: MANGO },
  { svg: PeachSvg, type: PEACH },
  { svg: PearSvg, type: PEAR }
];
const vegetables: FoodIconType[] = [
  { svg: CarrotSvg, type: CARROT },
  { svg: PotatoSvg, type: POTATO },
  { svg: BeetrootSvg, type: BEETROOT },
  { svg: PumpkinSvg, type: PUMPKIN },
  { svg: PeasSvg, type: PEAS }
];
const meat: FoodIconType[] = [
  { svg: ChickenSvg, type: CHICKEN },
  { svg: TurkeySvg, type: TURKEY },
  { svg: RabbitSvg, type: RABBIT },
  { svg: FishSvg, type: FISH },
  { svg: EggSvg, type: EGG }
];

const allFood: FoodIconType[][] = [fruits, vegetables, meat];

interface Food {
  [name: string]: boolean;
}

const initialFood: Food = {
  [APPLE]: false,
  [BANANA]: false,
  [MANGO]: false,
  [PEACH]: false,
  [PEAR]: false,
  [CARROT]: false,
  [POTATO]: false,
  [BEETROOT]: false,
  [PUMPKIN]: false,
  [PEAS]: false,
  [CHICKEN]: false,
  [TURKEY]: false,
  [RABBIT]: false,
  [FISH]: false,
  [EGG]: false
};

export const Food = () => {
  const [food, updateFood] = useImmer(() => initialFood);
  const [foodElements, updateFoodElements] = useImmer(() => []);
  const [other, setOther] = useState("");

  const saveLog = () => {
    console.log("save");
  };

  const toggleFood = (type: string) => {
    updateFood((draft: Food) => {
      draft[type] = !draft[type];
    });
    updateFoodElements(draft => {
      if (food[type]) {
        draft.splice(draft.indexOf(type), 1);
      } else {
        draft.push(type);
      }
    });
  };

  const addOtherFood = () => {
    if (foodElements.indexOf(other) === -1) {
      updateFoodElements(draft => {
        draft.push(other);
      });
      setOther("");
    }
  };

  const removeFood = (name: string) => {
    updateFoodElements(draft => {
      draft.splice(draft.indexOf(name), 1);
    });
    if (food[name] === true) {
      updateFood((draft: Food) => {
        draft[name] = false;
      });
    }
  };

  return (
    <CenteredView>
      {allFood.map((foodType, index: number) => (
        <Row key={index}>
          {foodType.map(item => (
            <FoodIcon
              key={item.type}
              food={item}
              active={food[item.type]}
              onPress={toggleFood}
            />
          ))}
        </Row>
      ))}
      <Row alignItems="center">
        <ValueInput placeholder="Other..." value={other} setValue={setOther} />
        <MyButton onPress={addOtherFood}>
          <MyText>Add other</MyText>
        </MyButton>
      </Row>
      <Row>
        {foodElements.map(food => (
          <FoodElement key={food} name={food} onPress={removeFood} />
        ))}
      </Row>
      <Row justifyContent="center">
        <MyButton round onPress={saveLog}>
          <MaterialIcons name="add" color={theme[FOOD_SCREEN].font} size={40} />
        </MyButton>
      </Row>
    </CenteredView>
  );
};

export default Food;
