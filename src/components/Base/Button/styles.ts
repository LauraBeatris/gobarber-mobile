import styled, { css } from "styled-components/native";
import { transparentize } from "polished";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  height: 60px;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  margin-top: 8px;

  ${({ enabled, theme }) => !enabled && css`
    background: ${transparentize(0.4, theme.colors.yellow)};
  `}
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
`;
