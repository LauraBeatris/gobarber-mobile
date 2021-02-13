import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
`;

export const GreetingsText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.grayLight};
    font-size: 20px;
    font-family: ${theme.fonts.regular};
 `}
`;

export const HeaderInfo = styled.View`
  flex: 1;
`;

export const UserNameText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.yellow};
    font-size: 20px;
    font-family: ${theme.fonts.medium};
    max-width: 90%;
 `}
`;

