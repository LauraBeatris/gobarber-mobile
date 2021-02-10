import { TextInput, TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: TextInputProps["style"];
}

export interface InputValueRef {
  value: string;
}

export interface InputElementRef extends TextInput, InputValueRef {}

export interface InputForwardRef {
  focus(): void;
}
