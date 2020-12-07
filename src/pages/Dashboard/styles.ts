import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blackMedium};
`;

export const HeaderText = styled.Text`
  font-size: 20px;
`;

export const GreetingsText = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-family: 'RobotoSlab-Regular';
`;

export const UserNameText = styled.Text`
  color: ${({ theme }) => theme.colors.yellow};
  font-family: 'RobotoSlab-Medium';
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
