import styled, { css } from "styled-components/native";

export const ScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 25px;
    font-family: ${theme.fonts.medium};
    margin-bottom: 20px;
 `}
`;
