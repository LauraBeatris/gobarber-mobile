import { TextInputProperties, TextInput } from "react-native";

export interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
}

export interface InputValueRef {
  value: string;
}

export interface InputElementRef extends TextInput, InputValueRef {}

export interface InputFowardRef {
  focus(): void;
}
