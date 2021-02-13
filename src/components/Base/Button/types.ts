import { RectButtonProperties } from "react-native-gesture-handler";

export type ButtonProps = RectButtonProperties & {
  loading?: boolean;
  children: string;
}
