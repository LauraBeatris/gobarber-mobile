import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { HeaderContainerProps } from "./types";

export const HeaderContainer = styled.View<HeaderContainerProps>`
  width: 100%;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 20}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({
    theme,
    backgroundColor,
  }) => backgroundColor || theme.colors.blackMedium};
`;
