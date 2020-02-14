import React from "react";
import { Input } from "../styles/Inputs";
import { MyText } from "../styles/Text";
import { View } from "react-native";

interface Props {
  placeholder: string;
  label: string;
  value: string;
  setValue(value: string): void;
}

export const NumericValueInput = (props: Props) => {
  const { placeholder, label, value, setValue } = props;

  const onChange = (text: string) => {
    if (/^[0-9]+$/g.test(text) || text.length === 0) {
      setValue(text);
    }
  };

  return (
    <View>
      <MyText bold fontSize={2} marginBottom={2}>
        {label}
      </MyText>
      <Input
        onChangeText={onChange}
        value={value}
        keyboardType="numeric"
        placeholder={placeholder}
      />
    </View>
  );
};

export default NumericValueInput;
