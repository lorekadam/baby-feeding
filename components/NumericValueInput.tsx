import React from "react";
import { Input } from "../styles/Inputs";
import { Row } from "../styles/Grid";
import { MyText } from "../styles/Text";

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
    <Row alignItems="center">
      <Input
        onChangeText={onChange}
        value={value}
        keyboardType="numeric"
        placeholder={placeholder}
      />
      <MyText bold fontSize={3} marginLeft={10}>
        {label}
      </MyText>
    </Row>
  );
};

export default NumericValueInput;
