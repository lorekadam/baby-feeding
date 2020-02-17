import React from "react";
import { Input } from "../styles/Inputs";
import { MyText } from "../styles/Text";
import { View } from "react-native";

interface Props {
  placeholder: string;
  label?: string;
  value: string;
  setValue(value: string): void;
  numeric?: boolean;
}

export const ValueInput = (props: Props) => {
  const { placeholder, label, value, setValue, numeric } = props;

  const onChange = (text: string) => {
    if (numeric) {
      if (/^[0-9]+$/g.test(text) || text.length === 0) {
        setValue(text);
      }
    } else {
      setValue(text);
    }
  };

  return (
    <View>
      {label && (
        <MyText bold fontSize={2} marginBottom={2}>
          {label}
        </MyText>
      )}
      <Input
        onChangeText={onChange}
        value={value}
        keyboardType={numeric ? "numeric" : "default"}
        placeholder={placeholder}
      />
    </View>
  );
};

export default ValueInput;
