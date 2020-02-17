import React from "react";
import { MyText } from "../styles/Text";
import { CenteredView, ViewFlex } from "../styles/Views";
import { MaterialIcons } from "@expo/vector-icons";
import { MyButton } from "../styles/Buttons";
import { Row } from "../styles/Grid";
import { theme } from "../styles/colors";
import { FOOD_SCREEN } from "../screens/types";

// Fruit: -Apple-, -Banana-, -Mango-, -Peach-, -Pear-, Other
// Vegetables: -Carrot-, -Potato-, -Sweet Potato-, -Pumpkin-, -Peas-, Other
// Meat & Other: Chicken, Turkey, Rabbit, Fish, Eggs, Other

export const Food = () => {
  const saveLog = () => {
    console.log("save");
  };
  return (
    <CenteredView>
      <ViewFlex>
        <MyText>Food</MyText>
      </ViewFlex>
      <Row justifyContent="center">
        <MyButton round onPress={saveLog}>
          <MaterialIcons name="add" color={theme[FOOD_SCREEN].font} size={40} />
        </MyButton>
      </Row>
    </CenteredView>
  );
};

export default Food;
