import theme from "~/styles/theme";
import {
  DEFAULT,
  FOCUSED,
  FILLED,
  ERROR,
} from "./inputStates";

export const inputStateColors = {
  [DEFAULT]: theme.colors.gray,
  [ERROR]: theme.colors.red,
  [FOCUSED]: theme.colors.yellow,
  [FILLED]: theme.colors.yellow,
};

export type InputStates = keyof typeof inputStateColors;

const getInputStateColor = (state: InputStates): string => (
  inputStateColors[state] || inputStateColors[DEFAULT]
);

export default getInputStateColor;
