import styled, { css } from "styled-components/native";

export const HeaderTitleText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 20px;
    font-family: ${theme.fonts.medium};
  `}
`;
