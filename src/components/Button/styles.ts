import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.yellow};
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
`;
