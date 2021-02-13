import styled, { css } from "styled-components/native";

export const DatePickerDateText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.grayLight};
    font-size: 18px;
    font-family: ${theme.fonts.medium};
    margin-bottom: 10px;
  `}
`;
