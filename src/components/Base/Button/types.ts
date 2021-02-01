import { RectButtonProperties } from "react-native-gesture-handler";

export interface ButtonProps extends RectButtonProperties {
  loading?: boolean;
  children: string;
}
