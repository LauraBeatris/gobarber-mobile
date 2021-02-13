import { TextInput, TextInputProps } from "react-native";

export type InputProps = TextInputProps & {
  name: string;
  icon: string;
  containerStyle?: TextInputProps["style"];
}

export type InputValueRef = {
  value: string;
}

export type InputElementRef = TextInput & InputValueRef

export type InputForwardRef = {
  focus(): void;
}

export type ContainerProps = Pick<InputProps, "containerStyle"> & {
  inputStateColor: string;
}
