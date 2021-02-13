import styled, { css } from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

import { InputProps } from "./types";

interface ContainerProps extends Pick<InputProps, "containerStyle"> {
  inputStateColor: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.darkSecondary};
  border: 2px solid ${({ theme }) => theme.colors.darkSecondary};
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;

  ${({ inputStateColor }) => inputStateColor
    && css`
      border: 2px solid ${inputStateColor};
    `};
`;
export const StyledTextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
