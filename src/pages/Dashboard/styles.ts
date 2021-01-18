import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
`;

export const GreetingsText = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
`;

export const HeaderInfo = styled.View`
  flex: 1;
`;

export const UserNameText = styled.Text`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  max-width: 90%;
`;

